import { useParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs';

import styles from './styles.module.scss';

import { AppDispatch, RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { MoviesState, retrieveMovieDetail } from '../../slices/movies';
import { toHoursAndMinutes } from '../../shared/utils';

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const initFetch = useCallback(() => {
    if (id) {
      dispatch(retrieveMovieDetail(id));
    }
  }, [dispatch]);

  const { movieDetail } = useSelector<RootState, MoviesState>(
    (state) => state?.movies
  );
  console.log(222, movieDetail);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <>
      {movieDetail && (
        <>
          <Breadcrumbs title={movieDetail.title} />
          <div className={styles.container}>
            <div className={styles.image__container}>
              <img
                className={styles.detail__image}
                src={`${process.env.REACT_APP_PUBLIC_PATH}/${movieDetail.poster_path}`}
                alt={movieDetail.title}
              />
            </div>
            <div className={styles.title__container}>
              <div className={styles.main__title}>{movieDetail.title}</div>
              <p>{movieDetail.overview}</p>
              <div className={styles.genre}>
                <div className={styles.genre__list}>
                  {movieDetail.genres &&
                    movieDetail.genres.map((item) => item.name).join(',  ')}
                </div>
                <div className={styles.year}>
                  <img
                    src="https://img.icons8.com/ios/50/null/calendar--v1.png"
                    width={15}
                    height={15}
                  />
                  <span> {movieDetail.release_date}</span>
                </div>
                <div className={styles.year}>
                  <img
                    src="https://img.icons8.com/ios/50/null/clock--v1.png"
                    width={15}
                    height={15}
                  />
                  <span>{toHoursAndMinutes(movieDetail.runtime)}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Details;
