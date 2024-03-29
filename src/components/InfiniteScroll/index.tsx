import { ReactNode, useEffect, useRef, useState } from 'react';

interface InfiniteScroll<T> {
  children: ReactNode;
  //   fetchMore: () => Promise<void>;
  fetchMore: () => Promise<T>;
  hasMore: boolean;
  loading?: ReactNode;
}

const InfiniteScroll = <T,>({
  children,
  fetchMore,
  hasMore,
  loading,
}: InfiniteScroll<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isLoading && hasMore) {
          setIsLoading(true);
          fetchMore()
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
        }
      });
    });

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [fetchMore, hasMore, isLoading]);

  return (
    <div>
      {children}
      <div ref={sentinelRef} />
      {isLoading && (loading ? loading : <div>Loading...</div>)}
    </div>
  );
};

export default InfiniteScroll;
