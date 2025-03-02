import { NavLink } from 'react-router-dom';
import { CATALOG, FilterOption } from '../Catalog.data.ts';
import styles from '../Catalog.module.scss';

type CatalogNavigationProps = {
  isActive: string | null;
  toggleStringInArray: (newString: FilterOption) => void;
  filterArr: string[];
};

export const CatalogNavigation = ({
  toggleStringInArray,
  filterArr
}: CatalogNavigationProps) => {
  return (
    <div className={styles.menu}>
      <h3 className={styles.title}>Каталог</h3>
      <ul className={styles.list}>
        {CATALOG.map(({ link, title }) => (
          <li className={styles.item} key={link}>
            <NavLink
              onClick={() => toggleStringInArray(link as FilterOption)}
              to={{
                pathname: `/catalog`,
                search: `?category=${link}`
              }}
              style={{
                fontWeight:
                  filterArr.length > 0 && filterArr.includes(link)
                    ? '700'
                    : '300'
              }}
              key={link}
              className={styles.link}
            >
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
