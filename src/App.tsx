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
import ProtectedRoute from './components/admin/ProtectedRoute';
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
import CustomerHistory from './pages/admin/CustomerHistory';
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
import ViewConsignor from './pages/admin/ViewConsignor';
import EditConsignor from './pages/admin/EditConsignor';
import ConsignorHistory from './pages/admin/ConsignorHistory';
import Configuration from './pages/admin/Configuration';
import Notification from './pages/admin/Notification';
import NotificationList from './pages/admin/NotificationList';
import Coupons from './pages/admin/Coupons';
import AddCoupon from './pages/admin/AddCoupon';
import ViewCoupon from './pages/admin/ViewCoupon';
import EditCoupon from './pages/admin/EditCoupon';
import AccountsReceivable from './pages/admin/AccountsReceivable';
import AddAccountsReceivable from './pages/admin/AddAccountsReceivable';
import ViewAccountsReceivable from './pages/admin/ViewAccountsReceivable';
import EditAccountsReceivable from './pages/admin/EditAccountsReceivable';
import AccountsPayable from './pages/admin/AccountsPayable';
import AddAccountsPayable from './pages/admin/AddAccountsPayable';
import ViewAccountsPayable from './pages/admin/ViewAccountsPayable';
import EditAccountsPayable from './pages/admin/EditAccountsPayable';
import CashFlow from './pages/admin/CashFlow';
import OpenCashBox from './pages/admin/OpenCashBox';
import CloseCashBox from './pages/admin/CloseCashBox';
import AddCashMovement from './pages/admin/AddCashMovement';
import ListUser from './pages/admin/ListUser';
import AddUser from './pages/admin/AddUser';
import ViewUser from './pages/admin/ViewUser';
import EditUser from './pages/admin/EditUser';
import ProfitSimulation from './pages/admin/ProfitSimulation';
import FeatureFlags from './pages/admin/FeatureFlags';

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
            <Route
              index
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Rotas de Produtos - Habilitadas */}
            <Route
              path='produtos'
              element={
                <ProtectedRoute>
                  <ListProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path='produtos/adicionar'
              element={
                <ProtectedRoute>
                  <AddProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path='produtos/visualizar/:productId'
              element={
                <ProtectedRoute>
                  <ViewProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path='produtos/editar/:productId'
              element={
                <ProtectedRoute>
                  <EditProduct />
                </ProtectedRoute>
              }
            />

            {/* Rotas de Categorias - Habilitadas */}
            <Route
              path='categorias'
              element={
                <ProtectedRoute>
                  <Category />
                </ProtectedRoute>
              }
            />
            <Route
              path='categorias/adicionar'
              element={
                <ProtectedRoute>
                  <AddCategory />
                </ProtectedRoute>
              }
            />
            <Route
              path='categorias/visualizar/:categoryId'
              element={
                <ProtectedRoute>
                  <ViewCategory />
                </ProtectedRoute>
              }
            />
            <Route
              path='categorias/editar/:categoryId'
              element={
                <ProtectedRoute>
                  <EditCategory />
                </ProtectedRoute>
              }
            />

            {/* Rotas de Clientes - Desabilitadas */}
            <Route
              path='clientes'
              element={
                <ProtectedRoute>
                  <ListCustomers />
                </ProtectedRoute>
              }
            />
            <Route
              path='clientes/adicionar'
              element={
                <ProtectedRoute>
                  <AddCustomer />
                </ProtectedRoute>
              }
            />
            <Route
              path='clientes/visualizar/:customerId'
              element={
                <ProtectedRoute>
                  <ViewCustomer />
                </ProtectedRoute>
              }
            />
            <Route
              path='clientes/editar/:customerId'
              element={
                <ProtectedRoute>
                  <EditCustomer />
                </ProtectedRoute>
              }
            />
            <Route
              path='clientes/historico/:customerId'
              element={
                <ProtectedRoute>
                  <CustomerHistory />
                </ProtectedRoute>
              }
            />

            {/* Rotas de Pedidos - Desabilitadas */}
            <Route
              path='pedidos'
              element={
                <ProtectedRoute>
                  <OrderPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='pedidos/adicionar'
              element={
                <ProtectedRoute>
                  <AddOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path='pedidos/editar/:orderId'
              element={
                <ProtectedRoute>
                  <EditOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path='pedidos/visualizar/:orderId'
              element={
                <ProtectedRoute>
                  <ViewOrder />
                </ProtectedRoute>
              }
            />

            {/* Rotas de Fornecedores - Desabilitadas */}
            <Route
              path='fornecedores'
              element={
                <ProtectedRoute>
                  <Supplier />
                </ProtectedRoute>
              }
            />
            <Route
              path='fornecedores/adicionar'
              element={
                <ProtectedRoute>
                  <AddSupplier />
                </ProtectedRoute>
              }
            />
            <Route
              path='fornecedores/visualizar/:supplierId'
              element={
                <ProtectedRoute>
                  <ViewSupplier />
                </ProtectedRoute>
              }
            />
            <Route
              path='fornecedores/editar/:supplierId'
              element={
                <ProtectedRoute>
                  <EditSupplier />
                </ProtectedRoute>
              }
            />

            {/* Rotas de Consignantes - Desabilitadas */}
            <Route
              path='consignantes'
              element={
                <ProtectedRoute>
                  <Consignor />
                </ProtectedRoute>
              }
            />
            <Route
              path='consignantes/adicionar'
              element={
                <ProtectedRoute>
                  <AddConsignor />
                </ProtectedRoute>
              }
            />
            <Route
              path='consignantes/visualizar/:consignorId'
              element={
                <ProtectedRoute>
                  <ViewConsignor />
                </ProtectedRoute>
              }
            />
            <Route
              path='consignantes/editar/:consignorId'
              element={
                <ProtectedRoute>
                  <EditConsignor />
                </ProtectedRoute>
              }
            />
            <Route
              path='consignantes/historico/:consignorId'
              element={
                <ProtectedRoute>
                  <ConsignorHistory />
                </ProtectedRoute>
              }
            />

            {/* Rotas de Contas a Receber - Desabilitadas */}
            <Route
              path='contas-receber'
              element={
                <ProtectedRoute>
                  <AccountsReceivable />
                </ProtectedRoute>
              }
            />
            <Route
              path='contas-receber/adicionar'
              element={
                <ProtectedRoute>
                  <AddAccountsReceivable />
                </ProtectedRoute>
              }
            />
            <Route
              path='contas-receber/visualizar/:accountId'
              element={
                <ProtectedRoute>
                  <ViewAccountsReceivable />
                </ProtectedRoute>
              }
            />
            <Route
              path='contas-receber/editar/:accountId'
              element={
                <ProtectedRoute>
                  <EditAccountsReceivable />
                </ProtectedRoute>
              }
            />

            {/* Rotas de Contas a Pagar - Desabilitadas */}
            <Route
              path='contas-pagar'
              element={
                <ProtectedRoute>
                  <AccountsPayable />
                </ProtectedRoute>
              }
            />
            <Route
              path='contas-pagar/adicionar'
              element={
                <ProtectedRoute>
                  <AddAccountsPayable />
                </ProtectedRoute>
              }
            />
            <Route
              path='contas-pagar/visualizar/:accountId'
              element={
                <ProtectedRoute>
                  <ViewAccountsPayable />
                </ProtectedRoute>
              }
            />
            <Route
              path='contas-pagar/editar/:accountId'
              element={
                <ProtectedRoute>
                  <EditAccountsPayable />
                </ProtectedRoute>
              }
            />

            {/* Rotas de Fluxo de Caixa - Desabilitadas */}
            <Route
              path='fluxo-caixa'
              element={
                <ProtectedRoute>
                  <CashFlow />
                </ProtectedRoute>
              }
            />
            <Route
              path='fluxo-caixa/abrir'
              element={
                <ProtectedRoute>
                  <OpenCashBox />
                </ProtectedRoute>
              }
            />
            <Route
              path='fluxo-caixa/fechar/:sessionId'
              element={
                <ProtectedRoute>
                  <CloseCashBox />
                </ProtectedRoute>
              }
            />
            <Route
              path='fluxo-caixa/movimentacao/adicionar'
              element={
                <ProtectedRoute>
                  <AddCashMovement />
                </ProtectedRoute>
              }
            />

            {/* Rotas de Cupons - Desabilitadas */}
            <Route
              path='cupons'
              element={
                <ProtectedRoute>
                  <Coupons />
                </ProtectedRoute>
              }
            />
            <Route
              path='cupons/adicionar'
              element={
                <ProtectedRoute>
                  <AddCoupon />
                </ProtectedRoute>
              }
            />
            <Route
              path='cupons/visualizar/:couponId'
              element={
                <ProtectedRoute>
                  <ViewCoupon />
                </ProtectedRoute>
              }
            />
            <Route
              path='cupons/editar/:couponId'
              element={
                <ProtectedRoute>
                  <EditCoupon />
                </ProtectedRoute>
              }
            />

            {/* Rotas de Usuários - Desabilitadas */}
            <Route
              path='usuarios'
              element={
                <ProtectedRoute>
                  <ListUser />
                </ProtectedRoute>
              }
            />
            <Route
              path='usuarios/adicionar'
              element={
                <ProtectedRoute>
                  <AddUser />
                </ProtectedRoute>
              }
            />
            <Route
              path='usuarios/visualizar/:userId'
              element={
                <ProtectedRoute>
                  <ViewUser />
                </ProtectedRoute>
              }
            />
            <Route
              path='usuarios/editar/:userId'
              element={
                <ProtectedRoute>
                  <EditUser />
                </ProtectedRoute>
              }
            />

            {/* Rotas de Sistema - Desabilitadas */}
            <Route
              path='configuracoes'
              element={
                <ProtectedRoute>
                  <Configuration />
                </ProtectedRoute>
              }
            />
            <Route
              path='notificacoes'
              element={
                <ProtectedRoute>
                  <Notification />
                </ProtectedRoute>
              }
            />
            <Route
              path='notificacoes/lista'
              element={
                <ProtectedRoute>
                  <NotificationList />
                </ProtectedRoute>
              }
            />
            <Route
              path='simulacao-lucro'
              element={
                <ProtectedRoute>
                  <ProfitSimulation />
                </ProtectedRoute>
              }
            />

            {/* Feature Flags - Sempre acessível para administradores */}
            <Route path='feature-flags' element={<FeatureFlags />} />
          </Route>
        </Routes>
        {!isAdminPath && <Footer />}
      </CartProvider>
    </ProductProvider>
  );
};

export default App;
