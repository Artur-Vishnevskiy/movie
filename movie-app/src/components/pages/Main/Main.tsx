import { type FC } from 'react';
import styles from './Main.module.scss';
import Poster from '../../atoms/Poster/Poster';

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

interface MainProps {
  setFilm: (film: Film) => void;
  films: Film[];
}

const Main: FC<MainProps> = ({ setFilm, films }) => (
  <>
    <div className={styles.mainUnit}>
      <p className={styles.category}>Latest Releases</p>
      <div className={styles.unitWithPosters}>
        {films.map((film: Film) => (
          <Poster 
            setFilmInfo={setFilm} 
            filmInfo={film} 
            key={film.id}
          />
        ))}
      </div>
    </div>
    <div className={styles.back} />
  </>
);

export default Main;