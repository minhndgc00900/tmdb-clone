import { useLocation } from 'react-router';
import { hyphenToUpper } from '../../shared/utils';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

interface BreadcrumbsProps {
  title: string;
}

const Breadcrumbs = (props: BreadcrumbsProps) => {
  const { title = '' } = props;
  const { pathname } = useLocation();
  const pathList = pathname.split('/').filter((it: string) => it !== '');

  return (
    <nav>
      {pathList.map((path: string, index: number) => {
        let pathN = path;

        if (title && index === pathList.length - 1) {
          pathN = title;
        }

        const name = hyphenToUpper(pathN);
        const isActive = path === pathList[pathList.length - 1];

        return (
          <>
            <Link
              to={`/${path}`}
              key={index}
              className={
                isActive
                  ? styles.breadcrumb__active
                  : styles.breadcrumb__inactive
              }
            >
              {name}
            </Link>
            {!isActive && <span className={styles.arrow}>/</span>}
          </>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
