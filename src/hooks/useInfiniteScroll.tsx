import { useEffect, useCallback } from "react";

export function useInfiniteScroll(
  container: HTMLElement | null,
  onLoadMore: () => void,
  threshold = 100
) {
  const handleScroll = useCallback(() => {
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    if (scrollHeight - (scrollTop + clientHeight) < threshold) {
      onLoadMore();
    }
  }, [container, onLoadMore, threshold]);

  useEffect(() => {
    const currentContainer = container;
    if (!currentContainer) return;

    currentContainer.addEventListener("scroll", handleScroll);
    return () => {
      currentContainer.removeEventListener("scroll", handleScroll);
    };
  }, [container, handleScroll]);
}
