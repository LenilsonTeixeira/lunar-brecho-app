type ContainerProps = {
  children: React.ReactNode;
};
const Container = ({ children }: ContainerProps) => {
  return <div className='mt-19 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>{children}</div>;
};

export default Container;
