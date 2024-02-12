import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import AppLayout from './components/layout/AppLayout';
import Teams from './pages/Teams';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Signup />} />
        <Route path="/teams" element={<Teams />} />
      </Route>
    </Routes>
  );
}

export default App;
