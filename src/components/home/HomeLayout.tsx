import { ReactNode } from 'react';
import Container from '../layout/Container';
import SearchBar from '../layout/SearchBar';
import CategoryCarousel from '../carousel/CategoryCarousel';

type Props = {
  children: ReactNode;
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
};

const HomeLayout = ({
  children,
  selectedCategory,
  onSelectCategory,
  onSearch,
  searchQuery,
}: Props) => {
  return (
    <>
      <Container>
        <SearchBar onSearch={onSearch} searchQuery={searchQuery} />
        <CategoryCarousel selectedCategory={selectedCategory} onSelectCategory={onSelectCategory} />
        {children}
      </Container>
    </>
  );
};

export default HomeLayout;
