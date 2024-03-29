import Skeleton from 'components/Skeleton';
import styles from './styles.module.scss';

interface CardSkeletonI {
  showListview?: boolean;
}

const CardSkeleton = ({ showListview = false }: CardSkeletonI) => {
  return (
    <div
      className={styles['card-skeleton']}
      style={{
        flexDirection: showListview ? 'row' : 'column',
      }}
    >
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
