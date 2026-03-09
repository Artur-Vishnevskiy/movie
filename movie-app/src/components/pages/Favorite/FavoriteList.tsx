import { type FC } from 'react';
import styles from './FavoriteList.module.scss';
import FavoriteFilm from '../../atoms/FavoriteFilm/FavoriteFilm';

interface Film {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path?: string | null;
  overview?: string | null;
  release_date?: string | null;
  vote_average?: number | null;
  vote_count?: number | null;
  [key: string]: any;
}

interface FavoriteListProps {
  deleteFavoriteFilm: (index: number | Film) => void;
  arrayWithFavorite: Film[] | null;
}

const FavoriteList: FC<FavoriteListProps> = ({ deleteFavoriteFilm, arrayWithFavorite }) => {
  if (!arrayWithFavorite || arrayWithFavorite.length === 0) {
    return (
      <>
        <div className={styles.favoriteList}>
          <p className={styles.category}>Latest Releases</p>
          <p className={styles.message}>It's Empty</p>
        </div>
        <div className={styles.background} aria-hidden="true" />
      </>
    );
  }

  return (
    <>
      <div className={styles.favoriteList}>
        <p className={styles.category}>
          Favorite ({arrayWithFavorite.length})
        </p>
        {arrayWithFavorite.map((item: Film, index: number) => (
          <FavoriteFilm 
            deleteFavoriteFilm={deleteFavoriteFilm} 
            film={item} 
            index={index} 
            key={item.id}
          />
        ))}
      </div>
      <div className={styles.background} aria-hidden="true" />
    </>
  );
};

export default FavoriteList;