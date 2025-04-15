import { Route, Routes } from 'react-router';
import Header from './components/layout/Header';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Footer from './components/footer/Footer';
import { ProductProvider } from './contexts/ProductContext';

const App = () => {
  return (
    <ProductProvider>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/produtos/:productId' element={<ProductDetail />} />
      </Routes>
      <Footer />
    </ProductProvider>
  );
};

export default App;
