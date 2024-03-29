import { ReactNode, useEffect, useRef, useState } from 'react';
import { clearMoviesState } from 'slices/movies';
import { RootState } from 'store';
import { useDispatch, useSelector } from 'react-redux';

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
  const errorMsg = useSelector((state: RootState) => state.movies.error);

  console.log(123123, errorMsg);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await fetchMore();
        setIsLoading(false);
      } catch (error) {
        // Error is handled globally in Redux store, no need to manage it locally
        setIsLoading(false);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isLoading && hasMore && !errorMsg) {
          setIsLoading(true);
          fetchData();
        }
      });
    });

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [fetchMore, hasMore, isLoading, errorMsg]);

  return (
    <div>
      {children}
      <div ref={sentinelRef} />
      {isLoading && (loading ? loading : <div>Loading...</div>)}
      {errorMsg && <div>Error fetching data. Please try again later.</div>}
    </div>
  );
};

export default InfiniteScroll;
