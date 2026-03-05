import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { HomePage } from './pages/HomePage/HomePage';
import { TodoApp } from './pages/TodoApp';
import { HabitTracker } from './pages/HabitTracker';
import { WeatherApp } from './pages/WeatherApp';
import { MovieSearch } from './pages/MovieSearch';
import { QuizApp } from './pages/Quiz App';
import { GuessNumber } from './pages/GuessNumber';
import { MovieDetails } from './pages/MovieSearch/components/MovieDetails';
import { CryptoTrack } from './pages/CryptoTrack';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
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
            <Route path="quiz" element={<QuizApp />} />
            <Route path="guess" element={<GuessNumber />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
