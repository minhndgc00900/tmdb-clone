import CardSkeleton from 'components/CardSkeleton';
import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from '../../components/InfiniteScroll';
import Card from '../../components/card';
import { MoviesState, retrieveTopRatedMovies } from '../../slices/movies';
import { AppDispatch, RootState } from '../../store';
import styles from './styles.module.scss';

export interface Movie {
  poster_path: string;
  title: string;
  id: string;
  overview: string;
}

function TopRatedPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(1);
  const { topRatedMovies = [] } = useSelector<RootState, MoviesState>(
    (state) => state?.movies
  );
  const [columnCount, setColumnCount] = useState(5);

  useLayoutEffect(() => {
    function updateSize() {
      const width = window.innerWidth;

      setColumnCount(2);

      if (width > 420) {
        setColumnCount(4);
      }

      if (width > 768) {
        setColumnCount(8);
      }

      if (width > 1366) {
        setColumnCount(5);
      }
    }
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div>
      <h1>Top Rated Movies</h1>
      <InfiniteScroll
        fetchMore={() => {
          setPage((prev) => prev + 1);
          return dispatch(retrieveTopRatedMovies({ offset: page }));
        }}
        hasMore={topRatedMovies.length < 250}
        loading={
          <div className={styles.list}>
            {Array.from(Array(columnCount).keys()).map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <div className={styles.list}>
          {topRatedMovies &&
            topRatedMovies.length !== 0 &&
            topRatedMovies.map((item: Movie) => (
              <Card movie={item} key={item.id} showRate />
            ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default TopRatedPage;
