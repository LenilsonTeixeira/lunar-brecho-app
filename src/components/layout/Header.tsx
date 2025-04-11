import { Menu, Search, ShoppingBag, User, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router"

const menuItems = [
    { name: "INÍCIO", path: "/" },
    { name: "NOVIDADES", path: "/novidades" },
    { name: "PROMOÇÕES", path: "/promocoes" },
    { name: "CONTATO", path: "/contato" },
]

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    useEffect(() => console.log(menuOpen),[menuOpen])
  return (
    <div className="w-full flex items-center h-20 font-medium shadow-xl fixed top-0 left-0 z-50 bg-slate-100">
        <div className="flex h-20 items-center justify-between w-full px-4">
            <Link to="/"><h1 className="text-xl font-bold text-slate-700">LUNAR</h1></Link>
            <ul className={`h-full items-center absolute top-[83px] left-0 w-full  shadow-lg justify-center lg:static lg:flex md:shadow-none
          ${menuOpen ? "block" : "hidden"}`}>
                {menuItems.map((item) => (
                        <NavLink key={item.path} to={item.path}>
                            {({ isActive }) => (
                                <li className={`py-2 px-5 text-sm md:text-base border-b lg:border-0 h-10 lg:h-20 items-center flex
                                    ${isActive ? 'bg-slate-700 text-white' : 'text-slate-700'}`}>
                                    {item.name}
                                </li>
                            )}
                        </NavLink>
                    ))}
            </ul>

            <div className="flex gap-3">
                <Search />
                <User />
                <Link to="/carrinho"><ShoppingBag /></Link> 
                <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden transition-all duration-300 ease-in-out">
                    <div className={`transform transition-transform duration-300 ${menuOpen ? "scale-110" : "scale-100"}`}>
                        {menuOpen ? <X /> : <Menu />}
                    </div>       
                </button>
            </div>
        </div>
    </div>
  )
}

export default Header