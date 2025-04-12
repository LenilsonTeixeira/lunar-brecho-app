import { Search } from "lucide-react"

const SearchBar = () => {
  return (
    <div className="w-full mt-8 flex justify-center">
        <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
            <input type="text" className="flex-1 outline-none bg-inherit text-sm" placeholder="O que você procura hoje?"/>
            <button><Search/></button>
        </div>
    </div>
  )
}

export default SearchBar