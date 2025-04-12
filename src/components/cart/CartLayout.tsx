type LayoutProps = {
    children: React.ReactNode;
};

const CartLayout = ({ children }: LayoutProps) => {
    return (
        <div className="flex py-2 justify-between items-center px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mt-40">
          <div className="transition-opacity ease-in duration-500 opacity-100 w-full">
              {children}
          </div>
        </div>
      );
}

export default CartLayout