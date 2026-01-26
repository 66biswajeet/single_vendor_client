import { useState, useRef, useCallback, useEffect } from "react";

export function useImageZoom() {
  const [showZoom, setShowZoom] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const containerRef = useRef(null);
  const lensRef = useRef(null);

  // Cache measurements to avoid layout thrashing on every mousemove
  const measurementsRef = useRef({ rect: null, lensW: 0, lensH: 0 });
  const tickingRef = useRef(false);
  const lastEventRef = useRef(null);

  const updateMeasurements = useCallback(() => {
    const container = containerRef.current;
    const lens = lensRef.current;
    if (!container || !lens) return;
    const rect = container.getBoundingClientRect();
    measurementsRef.current.rect = rect;
    measurementsRef.current.lensW = lens.offsetWidth;
    measurementsRef.current.lensH = lens.offsetHeight;
  }, []);

  useEffect(() => {
    if (!containerRef.current || !lensRef.current) return;
    updateMeasurements();
    const onResize = () => updateMeasurements();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [updateMeasurements]);

  const processLastEvent = useCallback(() => {
    const e = lastEventRef.current;
    if (!e) {
      tickingRef.current = false;
      return;
    }

    const rect = measurementsRef.current.rect;
    const lensW = measurementsRef.current.lensW;
    const lensH = measurementsRef.current.lensH;
    if (!rect || !lensW || !lensH) {
      // fallback to reading measurements once and continue
      updateMeasurements();
    }

    const { clientX, clientY } = e;
    const x = clientX - (rect ? rect.left : 0);
    const y = clientY - (rect ? rect.top : 0);

    const maxX = (rect ? rect.width : 0) - lensW;
    const maxY = (rect ? rect.height : 0) - lensH;

    const newX = Math.max(0, Math.min(maxX, x - lensW / 2));
    const newY = Math.max(0, Math.min(maxY, y - lensH / 2));

    setLensPos({ x: newX, y: newY });
    setZoomPos({
      x: (newX / Math.max(1, maxX)) * 100 || 50,
      y: (newY / Math.max(1, maxY)) * 100 || 50,
    });

    tickingRef.current = false;
    lastEventRef.current = null;
  }, [updateMeasurements]);

  const handleMouseMove = useCallback(
    (e) => {
      if (!containerRef.current || !lensRef.current) return;
      lastEventRef.current = e;
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(processLastEvent);
      }
    },
    [processLastEvent],
  );

  const handleMouseEnter = useCallback(() => {
    setShowZoom(true);
    // update measurements once on enter to avoid repeated layout reads
    updateMeasurements();
  }, [updateMeasurements]);

  const handleMouseLeave = useCallback(() => setShowZoom(false), []);

  return {
    showZoom,
    lensPos,
    zoomPos,
    containerRef,
    lensRef,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  };
}
