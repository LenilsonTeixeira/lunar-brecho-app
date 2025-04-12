import { Product } from "../../types/product";
import Title from "../commom/Title";
import ProductItem from "../product/ProductItem";

type Props = {
  products: Product[];
};

const ProductSection = ({ products }: Props) => {
  return (
    <section className="flex flex-col items-start w-full mt-6">
      <Title name="Produtos" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-4 mt-4">
        {products.map((item) => (
          <ProductItem key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;