import { Route, Routes } from "react-router"
import Header from "./components/layout/Header"
import Home from "./pages/Home"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
function App() {

  return (
    <>
        <Header/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/produtos/:productId" element={<ProductDetail/>}/>
            <Route path="/carrinho" element={<Cart/>}/>
        </Routes>
    </>
  )
}

export default App
