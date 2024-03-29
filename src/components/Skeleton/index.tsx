import classNames from 'classnames';
import styles from './styles.module.scss';

interface SkeletonProps {
  line?: boolean;
  paragraph?: {
    rows: number;
  };
  image?: {
    width?: number | string;
    height?: number | string;
  };
}

const Skeleton = (props: SkeletonProps) => {
  const { line, paragraph, image } = props;

  const randomWith = () => {
    return Math.floor(Math.random() * window.innerWidth);
  };

  const lineClass = classNames(
    styles['animate-skeleton'],
    styles['line-skeleton'],
    styles['bg-skeleton']
  );

  const imageClass = classNames(
    styles['animate-skeleton'],
    styles['image-skeleton'],
    styles['bg-skeleton']
  );

  return (
    <>
      {/* button */}
      {line && <div className={lineClass}></div>}

      {/* paragraph */}
      {paragraph && (
        <div className={styles['paragraph-skeleton']}>
          {Array.from({ length: paragraph.rows }, (_, i) => i).map((i) => (
            <div
              key={i}
              style={{ maxWidth: randomWith() }}
              className={lineClass}
            ></div>
          ))}
        </div>
      )}

      {/* image */}
      {image && (
        <div
          style={{ width: image.width, height: image.height }}
          className={imageClass}
        >
          <svg
            className={styles['image-icon']}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
      )}
    </>
  );
};

export default Skeleton;
