import { useCallback, useEffect, useState, type FC } from 'react';
import './App.css';
import Main from './components/pages/Main/Main';
import Header from './components/molecules/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FilmInfo from './components/pages/FilmInfo/FilmInfo';
import FavoriteList from './components/pages/Favorite/FavoriteList';

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

interface ApiResponse {
  results: Film[];
  page: number;
  total_pages: number;
  total_results: number;
}

type ErrorState = string | null;
type StoredFilm = Film | null;
type FavoriteListType = Film[] | null;

const App: FC = () => {
  const [error, setError] = useState<ErrorState>(null);
  const [items, setItems] = useState<Film[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const [filmInfo, setFilmInfo] = useState<StoredFilm>(() => {
    const stored = localStorage.getItem('film');
    return stored ? JSON.parse(stored) : null;
  });

  const [arrayWithFavorite, setArrayWithFavorite] = useState<FavoriteListType>(() => {
    const stored = localStorage.getItem('favoriteList');
    return stored ? JSON.parse(stored) : null;
  });

  const setFilm = useCallback((film: Film): void => {
    localStorage.setItem('film', JSON.stringify(film));
    setFilmInfo(film);
  }, []);

  const deleteFromFavorite = useCallback((indexOrFilmInfo: number | Film): void => {
    if (!arrayWithFavorite) return;

    const newFavoriteList = [...arrayWithFavorite];

    if (typeof indexOrFilmInfo === "object") {
      const filmToDelete = indexOrFilmInfo;
      const index = newFavoriteList.findIndex(item => item.id === filmToDelete.id);
      if (index !== -1) {
        newFavoriteList.splice(index, 1);
        localStorage.setItem('favoriteList', JSON.stringify(newFavoriteList));
        setArrayWithFavorite(newFavoriteList);
      }
    } else {
      newFavoriteList.splice(indexOrFilmInfo, 1);
      localStorage.setItem('favoriteList', JSON.stringify(newFavoriteList));
      setArrayWithFavorite(newFavoriteList);
    }
  }, [arrayWithFavorite]);

  const changeFilmToNext = useCallback((idOfTheChangingFilm: number): void => {
    if (!items.length) return;

    const index = items.findIndex(item => item.id === idOfTheChangingFilm);
    
    if (index !== -1) {
      let nextFilm: Film;
      
      if (index === items.length - 1) {
        nextFilm = items[0];
      } else {
        nextFilm = items[index + 1];
      }
      
      localStorage.setItem('film', JSON.stringify(nextFilm));
      setFilmInfo(nextFilm);
    }
  }, [items]);

  const addToFavorite = useCallback((): void => {
    if (!filmInfo) return;

    let newFavoriteList: Film[];
    
    if (!arrayWithFavorite) {
      newFavoriteList = [filmInfo];
    } else {
      const isAlreadyInFavorite = arrayWithFavorite.some(item => item.id === filmInfo.id);
      if (!isAlreadyInFavorite) {
        newFavoriteList = [filmInfo, ...arrayWithFavorite];
      } else {
        newFavoriteList = [...arrayWithFavorite];
      }
    }
    
    localStorage.setItem('favoriteList', JSON.stringify(newFavoriteList));
    setArrayWithFavorite(newFavoriteList);
  }, [arrayWithFavorite, filmInfo]);

  const fetchMovies = useCallback(async (page: number, append: boolean = false) => {
    if (page === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=b683c012a64a394b810a227a54f70c06&page=${page}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: ApiResponse = await response.json();

      if (append) {
        setItems(prev => [...prev, ...data.results]);
      } else {
        setItems(data.results);
      }
      setTotalPages(data.total_pages);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Произошла неизвестная ошибка');
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    fetchMovies(1, false);
  }, []); 

  const loadMore = useCallback(() => {
    if (currentPage < totalPages && !loadingMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchMovies(nextPage, true);
    }
  }, [currentPage, totalPages, loadingMore, fetchMovies]);

  if (error) {
    return <div className="app-error">Ошибка: {error}</div>;
  }

  if (loading && items.length === 0) {
    return <div className="app-loading">Загрузка...</div>;
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route
            path='/favorite'
            element={
              <FavoriteList
                deleteFavoriteFilm={deleteFromFavorite}
                arrayWithFavorite={arrayWithFavorite || []}
              />
            }
          />
          <Route
            path='/film'
            element={
              <FilmInfo
                arrayWithFavorite={arrayWithFavorite || []}
                deleteFromFavorite={deleteFromFavorite}
                changeFilmToNext={changeFilmToNext}
                addToFavoriteFunction={addToFavorite}
                film={filmInfo}
              />
            }
          />
          <Route
            path='/'
            element={
              <Main
                setFilm={setFilm}
                films={items}
                hasMore={currentPage < totalPages}
                loadMore={loadMore}
                loading={loading && items.length === 0}
                loadingMore={loadingMore}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;