import { ReactNode } from "react";
import Container from "../layout/Container";
import SearchBar from "../layout/SearchBar";
import CategoryCarousel from "../carousel/CategoryCarousel";

type Props = {
  children: ReactNode;
};

const HomeLayout = ({ children }: Props) => {
  return (
    <Container>
      <SearchBar />
      <CategoryCarousel />
      {children}
    </Container>
  );
};

export default HomeLayout;