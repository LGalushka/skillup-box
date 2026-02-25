import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { HomePage } from './pages/HomePage/HomePage';
import { TodoApp } from './pages/TodoApp';
import { HabitTracker } from './pages/HabitTracker';
import { WeatherApp } from './pages/WeatherApp';
import { MovieSearch } from './pages/MovieSearch';
import { CryptoTrack } from './pages/CryptoTrack';
import { TicTacToe } from './pages/TicTacToe';
import { GuessNumber } from './pages/GuessNumber';
import { MovieDetails } from './pages/MovieSearch/components/MovieDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="todo" element={<TodoApp />} />
          <Route path="habit" element={<HabitTracker />} />
          <Route path="weather" element={<WeatherApp />} />
          <Route path="movies">
            <Route index element={<MovieSearch />} />
            <Route path=":imdbID" element={<MovieDetails />} />
          </Route>

          <Route path="crypto" element={<CryptoTrack />} />
          <Route path="tictac" element={<TicTacToe />} />
          <Route path="guess" element={<GuessNumber />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
