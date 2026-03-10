import { type FC } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './Main.module.scss';
import Poster from '../../atoms/Poster/Poster';

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

interface MainProps {
  setFilm: (film: Film) => void;
  films: Film[];
  hasMore: boolean;
  loadMore: () => void;
  loading?: boolean;
  loadingMore?: boolean;
}

const Main: FC<MainProps> = ({
  setFilm,
  films,
  hasMore,
  loadMore,
  loading = false,
}) => {
  if (loading && films.length === 0) {
    return <div className={styles.loading}>Загрузка фильмов...</div>;
  }

  return (
    <>
      <div className={styles.mainUnit}>
        <p className={styles.category}>Latest Release</p>
        <InfiniteScroll
          dataLength={films.length}
          next={loadMore}
          hasMore={hasMore}
          loader={<div className={styles.loader}>Загрузка...</div>}
          endMessage={<div className={styles.endMessage}>Это всё</div>}
          scrollThreshold={0.9}
        >
          <div className={styles.unitWithPosters}>
            {films.map((film: Film) => (
              <Poster
                setFilmInfo={setFilm}
                filmInfo={film}
                key={film.id}
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>
      <div className={styles.back} />
    </>
  );
};

export default Main;