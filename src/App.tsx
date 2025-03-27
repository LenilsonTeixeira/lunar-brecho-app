import { Route, Routes } from "react-router"
import Header from "./components/Header"
import SearchBar from "./components/SearchBar"
import Home from "./pages/Home"

function App() {

  return (
    <>
        <Header/>
        <SearchBar/>
        <Routes>
            <Route path="/" element={<Home/>} />
        </Routes>
    </>
  )
}

export default App
