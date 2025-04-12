import Container from "../layout/Container";

type LayoutProps = {
    children: React.ReactNode;
};


const ProductDetailLayout = ({ children }: LayoutProps) => {
    return (
       <Container>
            <div className="flex justify-between items-center">
            <div className="transition-opacity ease-in duration-500 opacity-100">
                <div className="flex gap-12 flex-col sm:gap-12 sm:flex-row">
                    {children}
                </div>
            </div>
            </div>
       </Container>

      );
}

export default ProductDetailLayout