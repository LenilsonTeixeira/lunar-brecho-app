import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

interface Customer {
  id: number;
  name: string;
  phone: string;
  address: string;
}

const CustomerHistory = () => {
  const navigate = useNavigate();
  const { customerId } = useParams();

  // Mock data - em uma aplicação real, isso viria de uma API
  const mockCustomer: Customer = {
    id: parseInt(customerId || '1'),
    name: 'Maria Silva Santos',
    phone: '(11) 99999-1234',
    address: 'Rua das Flores, 123 - Vila Madalena, São Paulo - SP',
  };

  return (
    <div className='py-6 flex flex-col justify-between bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='mb-8'>
          <div className='flex items-center gap-4 mb-4'>
            <button
              onClick={() => navigate(`/admin/clientes/visualizar/${customerId}`)}
              className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-300'
            >
              <ArrowLeft className='w-4 h-4' />
              Voltar
            </button>
          </div>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>
            Histórico de Compras
          </h1>
          <p className='text-sm sm:text-base text-slate-600'>
            {mockCustomer.name} - #{mockCustomer.id}
          </p>
        </div>

        {/* Empty State */}
        <div className='bg-white rounded-xl shadow-lg p-6'>
          <div className='text-center py-12'>
            <div className='w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4'>
              <ShoppingBag className='w-8 h-8 text-slate-400' />
            </div>
            <h3 className='text-lg font-medium text-slate-800 mb-2'>Nenhuma compra encontrada</h3>
            <p className='text-sm text-slate-600'>
              Este cliente ainda não realizou nenhuma compra.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerHistory;
