import { Menu, Search, ShoppingBag, User } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router"

const menuItems = [
    { name: "INÍCIO", path: "/" },
    { name: "NOVIDADES", path: "/novidades" },
    { name: "PROMOÇÕES", path: "/promocoes" },
    { name: "CHINELOS", path: "/chinelos" },
    { name: "ACESSÓRIOS", path: "/acessorios" },
    { name: "CONTATO", path: "/contato" },
]

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    useEffect(() => console.log(menuOpen),[menuOpen])
  return (
    <div className="w-full flex items-center h-20 font-medium shadow-xl relative bg-slate-100">
        <div className="flex h-20 items-center justify-between w-full px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
            <Link to="/"><h1 className="text-xl font-bold text-slate-700">LUNAR</h1></Link>
            <ul className={`h-full items-center absolute top-[83px] left-0 w-full  shadow-lg justify-center lg:static lg:flex md:shadow-none
          ${menuOpen ? "block" : "hidden"}`}>
                {menuItems.map((item) => (
                        <NavLink key={item.path} to={item.path}>
                            {({ isActive }) => (
                                <li className={`py-3 px-5 text-sm md:text-base border-b lg:border-0 h-20 items-center flex
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
                <ShoppingBag />
                <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden"><Menu/></button>
            </div>
        </div>
    </div>
  )
}

export default Header