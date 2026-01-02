// Imagem placeholder para quando a imagem do produto não carregar
export const DEFAULT_PRODUCT_IMAGE =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    `
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="533" viewBox="0 0 400 533">
  <rect width="400" height="533" fill="#e2e8f0"/>
  <rect x="150" y="200" width="100" height="75" rx="8" fill="none" stroke="#94a3b8" stroke-width="4"/>
  <circle cx="175" cy="225" r="12" fill="#94a3b8"/>
  <polygon points="155,265 185,235 210,255 230,230 245,250 245,265" fill="#94a3b8"/>
  <text x="200" y="320" text-anchor="middle" fill="#94a3b8" font-family="Arial, sans-serif" font-size="16">Sem imagem</text>
</svg>
`.trim(),
  );

// Função helper para lidar com erro de imagem
export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackSrc: string = DEFAULT_PRODUCT_IMAGE,
) => {
  const target = event.currentTarget;
  // Evita loop infinito se o fallback também falhar
  if (target.src !== fallbackSrc) {
    target.src = fallbackSrc;
  }
};

// Verifica se uma URL de imagem é válida (não vazia ou só espaços)
export const isValidImageUrl = (url: string | null | undefined): boolean => {
  return !!url && url.trim() !== '';
};

// Retorna a URL da imagem ou o fallback se for inválida
export const getImageUrl = (url: string | null | undefined): string => {
  return isValidImageUrl(url) ? url! : DEFAULT_PRODUCT_IMAGE;
};

// Filtra um array de imagens removendo URLs vazias e retorna pelo menos a imagem default
export const getValidImages = (images: (string | null | undefined)[]): string[] => {
  const validImages = images.filter(isValidImageUrl) as string[];
  return validImages.length > 0 ? validImages : [DEFAULT_PRODUCT_IMAGE];
};
