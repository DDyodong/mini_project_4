import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomePage from '../pages/HomePage';
import BookDetailPage from '../pages/BookDetailPage';
import BookCreatePage from '../pages/BookCreatePage';
import BookEditPage from '../pages/BookEditPage';
 
const AppRouter = () => {
  return (
<BrowserRouter>
<Header />
<main style={{ minHeight: '70vh', padding: '20px' }}>
<Routes>
<Route path="/" element={<HomePage />} />
<Route path="/create" element={<BookCreatePage />} />
<Route path="/books/:id" element={<BookDetailPage />} />
<Route path="/edit/:id" element={<BookEditPage />} />
</Routes>
</main>
 
      <Footer />
</BrowserRouter>
  );
};
 
export default AppRouter;