import { Route, Routes } from "react-router"
import Header from "./components/layout/Header"
import Home from "./pages/Home"
import ProductDetail from "./pages/ProductDetail"
import Footer from "./components/footer/Footer"
function App() {

  return (
    <>
        <Header/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/produtos/:productId" element={<ProductDetail/>}/>
        </Routes>
        <Footer/>
    </>
  )
}

export default App
