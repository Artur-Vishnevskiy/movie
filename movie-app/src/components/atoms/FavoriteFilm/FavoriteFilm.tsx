import React, { type FC, memo, useCallback } from 'react';
import styles from './FavoriteFilm.module.scss';

interface Film {
  id: number;
  title: string;
  poster_path: string;
  overview?: string | null;
  backdrop_path?: string | null;
  release_date?: string | null;
  vote_average?: number | null;
  vote_count?: number | null;
  [key: string]: any;
}

interface FavoriteFilmProps {
  deleteFavoriteFilm: (index: number | Film) => void;
  film: Film;
  index: number;
  className?: string;
}

const FavoriteFilm: FC<FavoriteFilmProps> = ({ 
  deleteFavoriteFilm, 
  film, 
  index,
  className = '' 
}) => {
  const handleDelete = useCallback((): void => {
    deleteFavoriteFilm(index);
  }, [deleteFavoriteFilm, index]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleDelete();
    }
  }, [handleDelete]);

  const posterUrl = film.poster_path 
  ? `https://image.tmdb.org/t/p/w342${film.poster_path}`
  : 'https://placehold.co/342x513?text=No+Poster';

  const description = film.overview && film.overview.length > 200 
    ? `${film.overview.substring(0, 200)}...` 
    : film.overview || 'No description available';

  return (
    <div className={`${styles.mainContainer} ${className}`}>
      <div className={styles.favoriteFilm}>
        <img 
          className={styles.poster} 
          alt={`Poster for ${film.title}`}
          src={posterUrl}
          loading="lazy"
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.src = 'https://placehold.co/342x513?text=Poster+Not+Found';
}}
        />
        
        <div className={styles.descriptionOfFavoriteFilm}>
          <div className={styles.header}>
            <p className={styles.title}>{film.title}</p>
            <span 
              onClick={handleDelete}
              onKeyPress={handleKeyPress}
              className={styles.unfavoriteButton}
              role="button"
              tabIndex={0}
              aria-label={`Remove ${film.title} from favorites`}
            >
              Unfavorite
            </span>
          </div>
          
          <p className={styles.description}>{description}</p>
          
          {film.release_date && (
            <p className={styles.releaseDate}>
              Release: {new Date(film.release_date).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
      <hr className={styles.blackLine} aria-hidden="true" />
    </div>
  );
};

export default memo(FavoriteFilm);