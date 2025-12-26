import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import VideoPage from './pages/video/VideoPage';
import { AppProvider } from './context/AppContext';

function App() {


  return (
    <AppProvider>
      <Router>
        <div className="app-shell">
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />
            <Route path="/video/:videoId" element={<VideoPage />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>

  );
}

export default App;