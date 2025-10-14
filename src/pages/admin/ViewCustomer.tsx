import { ArrowLeft, User, MapPin } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { customerService, ApiError } from '@/services';

interface CustomerViewModel {
  id: string;
  name: string;
  phone: string;
  address: string;
  totalPurchases?: number;
  totalSpent?: number;
  lastPurchase?: string;
}

const ViewCustomer = () => {
  const navigate = useNavigate();
  const { customerId } = useParams();

  const [customer, setCustomer] = useState<CustomerViewModel | null>(null);
  const [fetchError, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!customerId) return;
      setError(null);
      try {
        setLoading(true);
        const data = await customerService.getCustomer(customerId);
        const address = data.addresses?.find((a) => a.isDefault) || data.addresses?.[0];
        const addressStr = address
          ? `${address.street || ''}, ${address.number || ''} - ${address.neighborhood || ''}, ${
              address.city || ''
            } - ${address.state || ''}`
          : 'Não informado';
        setCustomer({
          id: data.id,
          name: data.name,
          phone: data.phone,
          address: addressStr,
        });
      } catch (err) {
        if (err instanceof ApiError) setError(err.message);
        else setError('Erro de conexão.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [customerId]);

  if (isLoading) {
    return (
      <div className='py-6 flex flex-col justify-center items-center bg-slate-50 min-h-screen'>
        <div className='text-slate-600'>Carregando cliente...</div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className='py-6 flex flex-col justify-center items-center bg-slate-50 min-h-screen'>
        <div className='text-red-600'>Erro: {fetchError}</div>
      </div>
    );
  }

  return (
    <div className='py-6 flex flex-col justify-between bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='mb-8'>
          <div className='flex items-center gap-4 mb-4'>
            <button
              onClick={() => navigate('/admin/clientes')}
              className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-300'
            >
              <ArrowLeft className='w-4 h-4' />
              Voltar
            </button>
          </div>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>
            Cliente #{customerId}
          </h1>
          <p className='text-sm sm:text-base text-slate-600'>Detalhes completos do cliente</p>
        </div>

        <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'>
          {/* Informações do Cliente */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <User className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações do Cliente</h3>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Nome Completo
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{customer?.name || '—'}</span>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>Telefone</label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{customer?.phone || '—'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <MapPin className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Endereço</h3>
            </div>
            <div className='p-3 bg-white rounded-lg border border-slate-200'>
              <span className='text-slate-800'>{customer?.address || '—'}</span>
            </div>
          </div>

          {/* Ações */}
          <div className='pt-6 border-t border-slate-200'>
            <div className='flex flex-col sm:flex-row justify-end gap-3 sm:gap-4'>
              <button
                onClick={() => navigate(`/admin/clientes/editar/${customerId}`)}
                className='w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
              >
                Editar Cliente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomer;
