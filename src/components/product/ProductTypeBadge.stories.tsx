import ProductTypeBadge from './ProductTypeBadge';

// Exemplo de uso do componente ProductTypeBadge
const ProductTypeBadgeExamples = () => {
  return (
    <div className='p-8 space-y-8'>
      <div>
        <h2 className='text-2xl font-bold mb-4'>ProductTypeBadge - Exemplos de Uso</h2>

        <div className='space-y-6'>
          {/* Variante Default */}
          <div>
            <h3 className='text-lg font-semibold mb-3'>Variante Default</h3>
            <div className='flex gap-4'>
              <ProductTypeBadge type='Novo' />
              <ProductTypeBadge type='Bazar' />
            </div>
          </div>

          {/* Variante Compact */}
          <div>
            <h3 className='text-lg font-semibold mb-3'>Variante Compact</h3>
            <div className='flex gap-4'>
              <ProductTypeBadge type='Novo' variant='compact' />
              <ProductTypeBadge type='Bazar' variant='compact' />
            </div>
          </div>

          {/* Variante Detailed */}
          <div>
            <h3 className='text-lg font-semibold mb-3'>Variante Detailed</h3>
            <div className='flex gap-4'>
              <ProductTypeBadge type='Novo' variant='detailed' />
              <ProductTypeBadge type='Bazar' variant='detailed' />
            </div>
          </div>

          {/* Em contexto de card */}
          <div>
            <h3 className='text-lg font-semibold mb-3'>Em contexto de card de produto</h3>
            <div className='w-64 border rounded-lg p-4 relative'>
              <div className='absolute top-2 left-2'>
                <ProductTypeBadge type='Novo' variant='compact' />
              </div>
              <div className='h-32 bg-gray-200 rounded mb-3'></div>
              <h4 className='font-medium'>Nome do Produto</h4>
              <p className='text-sm text-gray-600'>R$ 99,90</p>
            </div>
          </div>

          {/* Em contexto de detalhes */}
          <div>
            <h3 className='text-lg font-semibold mb-3'>Em contexto de detalhes do produto</h3>
            <div className='border rounded-lg p-6'>
              <h4 className='font-medium mb-4'>Informações do Produto</h4>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <span className='text-sm text-gray-600'>Marca:</span>
                  <span>Marca Exemplo</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='text-sm text-gray-600'>Categoria:</span>
                  <span>Vestidos</span>
                </div>
                <div className='flex items-center gap-3'>
                  <span className='text-sm text-gray-600'>Tipo:</span>
                  <ProductTypeBadge type='Bazar' variant='detailed' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTypeBadgeExamples;
