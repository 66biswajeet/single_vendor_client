import Image from "next/image";
import React, { useEffect, useState } from "react";
import useNearScreen from "@hooks/useNearScreen";

const fallbackImage =
  "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png";

const ImageWithFallback = ({
  fallback = fallbackImage,
  alt,
  src,
  defer = false,
  sizes = "100%",
  className = "",
  style = {},
  ...props
}) => {
  const [error, setError] = useState(false);
  const [ref, isNear] = useNearScreen("300px");

  useEffect(() => {
    setError(false);
  }, [src]);

  const shouldLoad = !defer || isNear;
  const finalSrc = error ? fallback : shouldLoad ? src : fallback;

  // Wrapper keeps layout for next/image with `fill`
  return (
    <div ref={ref} className="w-full h-full relative">
      <Image
        alt={alt}
        onError={() => setError(true)}
        src={finalSrc}
        {...props}
        fill
        style={{ objectFit: "contain", ...style }}
        sizes={sizes}
        loading={defer ? "lazy" : props.loading}
        fetchPriority={defer ? "low" : props.fetchPriority}
        decoding="async"
        className={`object-contain transition duration-150 ease-linear transform group-hover:scale-105 p-2 ${className}`}
      />
    </div>
  );
};

export default ImageWithFallback;
