import { useState, useEffect } from 'react';
import { DEFAULT_PRODUCT_IMAGE, isValidImageUrl } from '../../constants/images';

interface ProductImageProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

/**
 * Componente de imagem que trata automaticamente URLs inválidas ou vazias
 * e erros de carregamento, exibindo um placeholder quando necessário.
 */
const ProductImage = ({ src, alt, className = '', loading = 'lazy' }: ProductImageProps) => {
  const [imageSrc, setImageSrc] = useState<string>(DEFAULT_PRODUCT_IMAGE);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset quando src muda
    setHasError(false);

    // Verifica se a URL é válida antes de tentar carregar
    if (isValidImageUrl(src)) {
      setImageSrc(src!);
    } else {
      setImageSrc(DEFAULT_PRODUCT_IMAGE);
    }
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImageSrc(DEFAULT_PRODUCT_IMAGE);
    }
  };

  return (
    <img src={imageSrc} alt={alt} className={className} loading={loading} onError={handleError} />
  );
};

export default ProductImage;
