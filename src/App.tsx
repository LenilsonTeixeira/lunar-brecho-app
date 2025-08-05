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
import ViewProduct from './pages/admin/ViewProduct';
import EditProduct from './pages/admin/EditProduct';
import ListCustomers from './pages/admin/ListCustomers';
import AddCustomer from './pages/admin/AddCustomer';
import ViewCustomer from './pages/admin/ViewCustomer';
import EditCustomer from './pages/admin/EditCustomer';
import OrderPage from './pages/admin/Order';
import AddOrder from './pages/admin/AddOrder';
import EditOrder from './pages/admin/EditOrder';
import ViewOrder from './pages/admin/ViewOrder';
import Category from './pages/admin/Category';
import AddCategory from './pages/admin/AddCategory';
import ViewCategory from './pages/admin/ViewCategory';
import EditCategory from './pages/admin/EditCategory';
import Supplier from './pages/admin/Supplier';
import AddSupplier from './pages/admin/AddSupplier';
import ViewSupplier from './pages/admin/ViewSupplier';
import EditSupplier from './pages/admin/EditSupplier';
import Consignor from './pages/admin/Consignor';
import AddConsignor from './pages/admin/AddConsignor';
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
            <Route path='produtos/visualizar/:productId' element={<ViewProduct />} />
            <Route path='produtos/editar/:productId' element={<EditProduct />} />
            <Route path='clientes/adicionar' element={<AddCustomer />} />
            <Route path='clientes/visualizar/:customerId' element={<ViewCustomer />} />
            <Route path='clientes/editar/:customerId' element={<EditCustomer />} />
            <Route path='pedidos/adicionar' element={<AddOrder />} />
            <Route path='pedidos/editar/:orderId' element={<EditOrder />} />
            <Route path='pedidos/visualizar/:orderId' element={<ViewOrder />} />
            <Route path='categorias/adicionar' element={<AddCategory />} />
            <Route path='categorias/visualizar/:categoryId' element={<ViewCategory />} />
            <Route path='categorias/editar/:categoryId' element={<EditCategory />} />
            <Route path='fornecedores/adicionar' element={<AddSupplier />} />
            <Route path='fornecedores/visualizar/:supplierId' element={<ViewSupplier />} />
            <Route path='fornecedores/editar/:supplierId' element={<EditSupplier />} />
            <Route path='consignantes/adicionar' element={<AddConsignor />} />
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
