import React, { useCallback, useEffect, useState, type FC } from 'react';
import styles from './FilmInfo.module.scss';
import DescriptionUnit from '../../atoms/DescriptionUnit/DescriptionUnit';
import { useNavigate } from 'react-router-dom';

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

interface FilmInfoProps {
  arrayWithFavorite: Film[] | null;
  deleteFromFavorite: (film: number | Film) => void;
  changeFilmToNext: (id: number) => void;
  addToFavoriteFunction: () => void;
  film: Film | null;
}

const FilmInfo: FC<FilmInfoProps> = ({
  arrayWithFavorite,
  deleteFromFavorite,
  changeFilmToNext,
  addToFavoriteFunction,
  film
}) => {
  const [addStatus, setAddStatus] = useState<boolean>(false);
 const navigate = useNavigate();

  if (!film) {
    return <div className={styles.filmInfoPage}>Фильм не найден</div>;
  }

  const handleAddressHome = useCallback((): void => {
    navigate('/');
  }, [navigate]);

  const handleAddressNextFilm = useCallback((): void => {
    if (film) {
      changeFilmToNext(film.id);
      navigate('/film');
    }
  }, [film, changeFilmToNext, navigate]);

  const handleDeleteFromFavorite = useCallback((): void => {
    if (film) {
      deleteFromFavorite(film);
    }
  }, [deleteFromFavorite, film]);

  useEffect(() => {
    if (!arrayWithFavorite || !film) {
      setAddStatus(false);
      return;
    }

    const isInFavorite = arrayWithFavorite.some((item: Film) => item.id === film.id);
    setAddStatus(isInFavorite);
  }, [arrayWithFavorite, film]);

  const releaseYear = film.release_date?.substr(0, 4) || 'Unknown';

  return (
    <div className={styles.filmInfoPage}>
      <div className={styles.unitWithButtons}>
        <span 
          onClick={handleAddressHome} 
          className={styles.navButton}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && handleAddressHome()}
        >
          Back to list
        </span>
        <span 
          onClick={handleAddressNextFilm} 
          className={styles.navButton}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && handleAddressNextFilm()}
        >
          Next Movie
        </span>
      </div>
      
      <div className={styles.unitWithInfo}>
        <img 
          alt={`Poster for ${film.title}`} 
          src={film.poster_path 
            ? `https://image.tmdb.org/t/p/w342${film.poster_path}` 
            : 'https://placehold.co/342x513?text=No+Poster'
          }
          loading="lazy"
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.src = 'https://placehold.co/342x513?text=Poster+Not+Found';
          }}
        />
        
        <div className={styles.infoUnit}>
          <div className={styles.titleUnit}>
            <p>
              {film.title} ({releaseYear})
            </p>
            
            {addStatus ? (
              <span 
                onClick={handleDeleteFromFavorite} 
                className={styles.favoriteButton}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && handleDeleteFromFavorite()}
              >
                Delete from favorite
              </span>
            ) : (
              <span 
                onClick={addToFavoriteFunction} 
                className={styles.favoriteButton}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && addToFavoriteFunction()}
              >
                Add to favorite
              </span>
            )}
          </div>
          
          <DescriptionUnit film={film} />
        </div>
      </div>
    </div>
  );
};

export default FilmInfo;