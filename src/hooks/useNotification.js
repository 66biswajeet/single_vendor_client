const useNotification = () => {
  // WebSocket functionality disabled to enable bfcache (back/forward cache)
  // bfcache improves navigation performance by caching full page state
  return {
    socket: null,
  };
};

export default useNotification;
