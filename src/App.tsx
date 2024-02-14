import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import AppLayout from './components/layout/AppLayout';
import Workers from './pages/Workers';
import Worker from './pages/Worker';
import Page404 from './pages/Page404';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Signup />} />
        <Route path="/:page" element={<Workers />} />
        <Route path="/worker/:id" element={<Worker />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
