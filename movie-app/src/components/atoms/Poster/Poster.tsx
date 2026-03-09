import React, { useCallback, type FC } from 'react';
import styles from './Poster.module.scss';
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

interface PosterProps {
  setFilmInfo: (film: Film) => void;
  filmInfo: Film;
  className?: string;
}

const Poster: FC<PosterProps> = ({ setFilmInfo, filmInfo, className = '' }) => {
  const navigate = useNavigate();

  const handleClick = useCallback((): void => {
    setFilmInfo(filmInfo);
    navigate('/film');
  }, [navigate, filmInfo, setFilmInfo]);

  const posterUrl = filmInfo.poster_path 
    ? `https://image.tmdb.org/t/p/w342${filmInfo.poster_path}`
    : 'https://placehold.co/342x513?text=No+Poster';

  return (
    <div className={`${styles.poster} ${className}`}>
      <span 
        onClick={handleClick}
        role="link"
        tabIndex={0}
        onKeyPress={(e: React.KeyboardEvent) => e.key === 'Enter' && handleClick()}
        aria-label={`View details for ${filmInfo.title}`}
      >
        <img 
          alt={`Poster for ${filmInfo.title}`} 
          src={posterUrl}
          loading="lazy"
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.src = 'https://placehold.co/342x513?text=Poster+Not+Found';
          }}
        />
      </span>
    </div>
  );
};

export default Poster;