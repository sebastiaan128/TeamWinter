import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Info from './pages/Info';
import Layout from './components/Layout';
import './index.scss';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
    <Route element={<Layout></Layout>}>
        <Route path='/' element={<Home />} />
        <Route path='/info' element={<Info />} />
    </Route>
    </Routes>
  </BrowserRouter>
);