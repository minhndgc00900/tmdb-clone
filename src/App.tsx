import Toast from 'components/Toast';
import { Navigate, Route, Routes } from 'react-router-dom';
import BaseLayout from './components/BaseLayout';
import Details from './pages/detail';
import MoviesPage from './pages/movies';
import TopRatedPage from './pages/top-rated';

function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<MoviesPage />} />
          <Route path="now-playing" element={<Navigate to="/" />} />
          <Route path="top-rated" element={<TopRatedPage />} />
          <Route path="movies/:id" element={<Details />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
      <Toast />
    </>
  );
}

export default App;
