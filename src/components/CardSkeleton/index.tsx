import Skeleton from 'components/Skeleton';
import styles from './styles.module.scss';

const CardSkeleton = () => {
  return (
    <div className={styles['card-skeleton']}>
      <Skeleton
        image={{
          width: '100%',
          height: 243,
        }}
      />
      <Skeleton line />
      <Skeleton line />
    </div>
  );
};

export default CardSkeleton;
