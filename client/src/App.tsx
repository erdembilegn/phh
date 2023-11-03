import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Home12 } from './pages/Home12';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/12" element={<Home12 />} />
    </Routes>
  );
};

export default App;
