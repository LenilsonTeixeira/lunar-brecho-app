import { Link } from "react-router"

const Header = () => {
  return (
    <div className="w-full flex items-center h-20 font-medium shadow-xl fixed top-0 left-0 z-50 bg-slate-100">
        <div className="flex h-20 items-center justify-center w-full px-4">
            <Link to="/"><h1 className="text-xl font-bold text-slate-700">LUNAR</h1></Link>
        </div>
    </div>
  )
}

export default Header