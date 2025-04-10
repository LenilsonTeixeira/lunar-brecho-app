import { useRef } from "react";

const categories = [
  { name: "Body", image: "https://acdn-us.mitiendanube.com/stores/004/414/596/products/86c1af187bed52a509db2649e0144039-424f199920b186aca517177081243046-1024-1024.webp" },
  { name: "Calças", image: "https://acdn-us.mitiendanube.com/stores/004/414/596/products/imagem-whatsapp-2025-01-27-as-17-05-21_981ec453-811c39988cd9bd47c317380867063164-1024-1024.webp" },
  { name: "Bolsas", image: "https://cdn.awsli.com.br/2500x2500/1538/1538522/produto/261972816/whatsapp-image-2024-03-27-at-10-01-16-am-372wo6a047.jpeg" },
  { name: "Macaquinhos", image: "https://cdn.awsli.com.br/1538/1538522/produto/338746166/img_1715-zdjy3qfnl6.jpeg"},
  { name: "Vestidos", image: "https://cdn.awsli.com.br/1538/1538522/produto/335928056/3d0ae793-6d64-4785-9eea-7638f716b531-rc61dwiw7t.jpeg" },
  { name: "Jeans", image: "https://acdn-us.mitiendanube.com/stores/004/414/596/products/img_6792-ref-24637-5afcdc908780ab980017283342510339-1024-1024.webp" },
  { name: "Chinelos", image: "https://cdn.awsli.com.br/1538/1538522/produto/246582579/f7c2f065-cd4d-4eb4-bb35-284c857de334-oxj4tjwkcp.jpeg" },
  { name: "Croppeds", image: "https://cdn.awsli.com.br/1538/1538522/produto/210614200/whatsapp-image-2023-03-30-at-15-23-39-rhjycw.jpg" },
  { name: "Conjuntos", image: "https://cdn.awsli.com.br/1538/1538522/produto/338700026/img_1646-vnkljmtjrp.jpeg" },
  { name: "Macacão", image: "https://cdn.awsli.com.br/1538/1538522/produto/299448951/71601444-a299-4587-ad99-bf170e7f9760-9ikj2wsrqb.jpeg" },
  { name: "Shorts", image: "https://cdn.awsli.com.br/1538/1538522/produto/217419654/whatsapp-image-2023-05-17-at-13-40-07-65w1r2wpb9.jpeg"}
  
];

export default function CategoryCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);


  return (
    <div className="relative w-full flex items-center justify-center mb-10 mt-3">
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto whitespace-nowrap scrollbar-hide px-10 py-2"
      >
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-25 h-25 rounded-full overflow-hidden border border-gray-300 shadow-md shadow-slate-600 hover:scale-105 cursor-pointer">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm text-gray-700 mt-1">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}