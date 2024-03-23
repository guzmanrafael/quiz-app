import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Match from './pages/Match';
import SideBar from './compoenents/ui/SideBar';
import Ronda from './pages/Ronda';
import Roulette from './compoenents/ui/Roulette';
import Winners from './pages/Winners';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <SideBar>
              <Home />
            </SideBar>
          }
        />
        <Route path="match" element={<Match />} />
        <Route path="ronda" element={<Ronda />} />
        <Route path="roulette" element={<Roulette />} />
        <Route path="Winners" element={<Winners />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
