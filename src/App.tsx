import { Route, Routes } from "react-router"
import Header from "./components/layout/Header"
import Home from "./pages/Home"
import ProductDetail from "./pages/ProductDetail"
function App() {

  return (
    <>
        <Header/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/produtos/:productId" element={<ProductDetail/>}/>
        </Routes>
    </>
  )
}

export default App
