import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Attacks from './pages/Attacks';
import Home from './pages/Home';
import Layout from './components/Layout';
import './index.scss';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
    <Route element={<Layout></Layout>}>
        <Route path='/' element={<Home />} />
        <Route path='/attacks' element={<Attacks />} />
    </Route>
    </Routes>
  </BrowserRouter>
);