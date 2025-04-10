type LayoutProps = {
    children: React.ReactNode;
  };


const ProductDetailLayout = ({ children }: LayoutProps) => {
    return (
        <div className="flex py-5 justify-between items-center px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mt-15">
          <div className="pt-10 transition-opacity ease-in duration-500 opacity-100">
            <div className="flex gap-12 flex-col sm:gap-12 sm:flex-row">
              {children}
            </div>
          </div>
        </div>
      );
}

export default ProductDetailLayout