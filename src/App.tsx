import { Route, Routes, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Footer from './components/footer/Footer';
import { ProductProvider } from './contexts/ProductContext';
import Layout from './pages/admin/Layout';
import Dashboard from './pages/admin/Dashboard';
import Banner from './components/banner/Banner';
import AddProduct from './pages/admin/AddProduct';

const App = () => {
  const isAdminPath = useLocation().pathname.includes('admin');

  // Inicializa o estado baseado no localStorage
  const [showBanner, setShowBanner] = useState(() => {
    const saved = localStorage.getItem('showBanner');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Salva o estado no localStorage sempre que ele mudar
  useEffect(() => {
    localStorage.setItem('showBanner', JSON.stringify(showBanner));
  }, [showBanner]);

  return (
    <ProductProvider>
      <Banner showBanner={showBanner} onClose={() => setShowBanner(false)} />
      {!isAdminPath && <Header showBanner={showBanner} />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/produtos/:productId' element={<ProductDetail />} />
        <Route path='/admin' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='produtos/adicionar' element={<AddProduct />} />
          <Route path='usuarios' element={<div>Página de Usuários</div>} />
          <Route path='relatorios' element={<div>Página de Relatórios</div>} />
          <Route path='configuracoes' element={<div>Página de Configurações</div>} />
        </Route>
      </Routes>
      {!isAdminPath && <Footer />}
    </ProductProvider>
  );
};

export default App;
