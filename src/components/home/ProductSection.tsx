import { Product } from "../../types/product";
import Title from "../commom/Title";
import ProductItem from "../product/ProductItem";
import NoProductsFound from "../product/NoProductsFound";

type Props = {
  title: string;
  products: Product[];
  searchQuery?: string;
  selectedCategory?: string | null;
};

const ProductSection = ({ products, title, searchQuery, selectedCategory }: Props) => {
  if (products.length === 0) {
    return <NoProductsFound searchQuery={searchQuery} selectedCategory={selectedCategory} />;
  }

  return (
    <section className="flex flex-col items-start w-full mt-6">
      <Title name={title} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-4 mt-4">
        {products.map((item) => (
          <ProductItem key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;