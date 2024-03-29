import CardSkeleton from 'components/CardSkeleton';
import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from '../../components/InfiniteScroll';
import Card from '../../components/card';
import { MoviesState, retrieveMovies } from '../../slices/movies';
import { AppDispatch, RootState } from '../../store';
import styles from './styles.module.scss';
import SwitchInput from 'components/Switch';

export interface Movie {
  poster_path: string;
  title: string;
  id: string;
  overview: string;
  vote_average?: number;
}

function MoviesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(1);
  const [showListview, setShowListview] = useState<boolean>(false);
  const { movies = [] } = useSelector<RootState, MoviesState>(
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <h1 className={styles.title__screen}>Latest Movies</h1>
        <div
          style={{
            display: 'flex',
            gap: 10,
          }}
        >
          <span>Show List View</span>
          <SwitchInput
            isChecked={showListview}
            setIsChecked={setShowListview}
          />
        </div>
      </div>

      <InfiniteScroll
        fetchMore={() => {
          setPage((prev) => prev + 1);
          return dispatch(retrieveMovies({ offset: page }));
        }}
        hasMore={movies.length < 250}
        loading={
          <div className={showListview ? styles.listView : styles.list}>
            {Array.from(Array(columnCount).keys()).map((i) => (
              <CardSkeleton key={i} showListview={showListview} />
            ))}
          </div>
        }
      >
        <div className={showListview ? styles.listView : styles.list}>
          {movies &&
            movies.length !== 0 &&
            movies.map((item: Movie) => (
              <Card
                movie={item}
                key={item.id}
                showDesc
                showListview={showListview}
              />
            ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default MoviesPage;
