import { useNavigate } from 'react-router';
import { Movie } from '../../pages/movies';

import styles from './styles.module.scss';
import { useState } from 'react';
import starLogo from './../../assets/star-icon.png';

interface ICard {
  movie: Movie;
  disableNavigate?: boolean;
  showDesc?: boolean;
  showRate?: boolean;
  showListview?: boolean;
}

const Card = (props: ICard) => {
  const {
    movie,
    disableNavigate = false,
    showRate = false,
    showDesc = false,
    showListview = false,
  } = props;
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  const navigate = useNavigate();

  const onDetail = () => {
    if (!disableNavigate) {
      navigate(`/movies/${movie.id}`);
    }
  };

  return (
    <div
      className={styles['card-item']}
      onClick={() => onDetail()}
      style={{
        flexDirection: showListview ? 'initial' : 'column',
      }}
    >
      <div>
        <img
          src={`${process.env.REACT_APP_PUBLIC_PATH}/${movie.poster_path}`}
          alt={movie.title}
          style={{
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.5s',
            width: showListview ? '10rem' : '100%',
          }}
          loading="lazy"
          onLoad={handleImageLoad}
          className={styles['main-image']}
        />
      </div>
      <div className={styles['title-container']}>
        <div
          className={styles['title']}
          title={`${movie.title}`}
          style={{
            textAlign: showListview ? 'start' : 'center',
          }}
        >
          {movie.title}
        </div>
        {showDesc && movie.overview && (
          <div className={styles['description']}>{movie.overview}</div>
        )}
        <div
          style={{
            display: 'flex',
            gap: 10,
            justifyContent: 'center',
          }}
        >
          {showRate && movie.vote_average && (
            <>
              <img src={starLogo} width={15} height={15} />
              <span>{movie.vote_average.toFixed(1)}</span>
            </>
          )}
        </div>
      </div>
      <div className={styles['tooltip-text']}>{movie.title}</div>
    </div>
  );
};

export default Card;
