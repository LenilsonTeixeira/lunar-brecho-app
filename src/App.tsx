import { Route, Routes, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Footer from './components/footer/Footer';
import { ProductProvider } from './contexts/ProductContext';
import { CartProvider } from './contexts/CartContext';
import Layout from './pages/admin/Layout';
import Dashboard from './pages/admin/Dashboard';
import Banner from './components/banner/Banner';
import AddProduct from './pages/admin/AddProduct';
import ListProduct from './pages/admin/ListProduct';
import ListCustomers from './pages/admin/ListCustomers';
import AddCustomer from './pages/admin/AddCustomer';
import OrderPage from './pages/admin/Order';
import AddOrder from './pages/admin/AddOrder';
import Category from './pages/admin/Category';
import AddCategory from './pages/admin/AddCategory';
import Supplier from './pages/admin/Supplier';
import AddSupplier from './pages/admin/AddSupplier';
import Consignor from './pages/admin/Consignor';
import Configuration from './pages/admin/Configuration';
import Notification from './pages/admin/Notification';
import NotificationList from './pages/admin/NotificationList';
import Coupons from './pages/admin/Coupons';
import AccountsReceivable from './pages/admin/AccountsReceivable';
import AddAccountsReceivable from './pages/admin/AddAccountsReceivable';
import AccountsPayable from './pages/admin/AccountsPayable';
import AddAccountsPayable from './pages/admin/AddAccountsPayable';
import CashFlow from './pages/admin/CashFlow';
import OpenCashBox from './pages/admin/OpenCashBox';
import CloseCashBox from './pages/admin/CloseCashBox';
import AddCashMovement from './pages/admin/AddCashMovement';

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
      <CartProvider>
        <Banner showBanner={showBanner} onClose={() => setShowBanner(false)} />
        {!isAdminPath && <Header showBanner={showBanner} />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/produtos/:productId' element={<ProductDetail />} />
          <Route path='/carrinho' element={<Cart />} />
          <Route path='/admin' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='produtos/adicionar' element={<AddProduct />} />
            <Route path='clientes/adicionar' element={<AddCustomer />} />
            <Route path='pedidos/adicionar' element={<AddOrder />} />
            <Route path='categorias/adicionar' element={<AddCategory />} />
            <Route path='fornecedores/adicionar' element={<AddSupplier />} />
            <Route path='contas-receber/adicionar' element={<AddAccountsReceivable />} />
            <Route path='contas-pagar/adicionar' element={<AddAccountsPayable />} />
            <Route path='fluxo-caixa/abrir' element={<OpenCashBox />} />
            <Route path='fluxo-caixa/fechar/:sessionId' element={<CloseCashBox />} />
            <Route path='fluxo-caixa/movimentacao/adicionar' element={<AddCashMovement />} />
            <Route path='clientes' element={<ListCustomers />} />
            <Route path='configuracoes' element={<Configuration />} />
            <Route path='notificacoes' element={<Notification />} />
            <Route path='notificacoes/lista' element={<NotificationList />} />
            <Route path='produtos' element={<ListProduct />} />
            <Route path='pedidos' element={<OrderPage />} />
            <Route path='categorias' element={<Category />} />
            <Route path='consignantes' element={<Consignor />} />
            <Route path='fornecedores' element={<Supplier />} />
            <Route path='contas-receber' element={<AccountsReceivable />} />
            <Route path='contas-pagar' element={<AccountsPayable />} />
            <Route path='fluxo-caixa' element={<CashFlow />} />
            <Route path='cupons' element={<Coupons />} />
          </Route>
        </Routes>
        {!isAdminPath && <Footer />}
      </CartProvider>
    </ProductProvider>
  );
};

export default App;
