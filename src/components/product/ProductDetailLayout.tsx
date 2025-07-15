import Container from '../layout/Container';

type LayoutProps = {
  children: React.ReactNode;
};

const ProductDetailLayout = ({ children }: LayoutProps) => {
  return (
    <Container>
      <div className='py-6 sm:py-8 lg:py-12'>
        <div className='transition-opacity ease-in duration-500 opacity-100'>
          <div className='flex gap-8 lg:gap-12 flex-col lg:flex-row'>{children}</div>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetailLayout;
