import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import Trending from './pages/Trending';
import Train from './pages/Train';
import Blog from './pages/Blog';
import Blogone from './pages/Blogone';
import Blogtwo from './pages/Blogtwo';
import Memitwo from './helper/Memitwo';

// Оставляем только страницы App и Trending
const router = (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Trending />} />
      <Route path="/trending" element={<App />} />
      <Route path="/Train" element={<Train />} />
      <Route path="/Blog" element={<Blog />} />
      <Route path="/Blogone" element={<Blogone />} />
      <Route path="/Blogtwo" element={<Blogtwo />} />
      <Route path="/Memitwo" element={<Memitwo />} />




    </Routes> 
  </BrowserRouter>
);

ReactDOM.render(router, document.getElementById('root'));