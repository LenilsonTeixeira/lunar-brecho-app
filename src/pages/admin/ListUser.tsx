import { useState } from 'react';
import { Search, Edit, Trash2, Eye, Plus } from 'lucide-react';
import { useNavigate } from 'react-router';

const ListCustomers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - substitua por dados reais da sua API
  const users = [
    {
      id: 1,
      name: 'Maria Silva Santos',
      phone: '(11) 99999-1234',
      address: 'Rua das Flores, 123 - Vila Madalena, São Paulo - SP',
    },
    {
      id: 2,
      name: 'João Pedro Oliveira',
      phone: '(11) 98888-5678',
      address: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP',
    },
    {
      id: 3,
      name: 'Ana Costa Ferreira',
      phone: '(11) 97777-9012',
      address: 'Rua Augusta, 500 - Consolação, São Paulo - SP',
    },
    {
      id: 4,
      name: 'Carlos Eduardo Lima',
      phone: '(11) 96666-3456',
      address: 'Rua Oscar Freire, 200 - Jardins, São Paulo - SP',
    },
    {
      id: 5,
      name: 'Fernanda Rodrigues Alves',
      phone: '(11) 95555-7890',
      address: 'Rua Teodoro Sampaio, 800 - Pinheiros, São Paulo - SP',
    },
    {
      id: 6,
      name: 'Lucas Mendes Pereira',
      phone: '(11) 94444-1234',
      address: 'Rua Harmonia, 300 - Vila Madalena, São Paulo - SP',
    },
    {
      id: 7,
      name: 'Juliana Santos Costa',
      phone: '(11) 93333-5678',
      address: 'Rua Cardeal Arcoverde, 150 - Pinheiros, São Paulo - SP',
    },
    {
      id: 8,
      name: 'Roberto Almeida Silva',
      phone: '(11) 92222-9012',
      address: 'Rua Fradique Coutinho, 600 - Vila Madalena, São Paulo - SP',
    },
    {
      id: 9,
      name: 'Patrícia Lima Oliveira',
      phone: '(11) 91111-3456',
      address: 'Rua Aspicuelta, 400 - Vila Madalena, São Paulo - SP',
    },
    {
      id: 10,
      name: 'Ricardo Ferreira Costa',
      phone: '(11) 90000-7890',
      address: 'Rua Wisard, 250 - Vila Madalena, São Paulo - SP',
    },
    {
      id: 11,
      name: 'Camila Rodrigues Santos',
      phone: '(11) 89999-1234',
      address: 'Rua Mourato Coelho, 700 - Vila Madalena, São Paulo - SP',
    },
    {
      id: 12,
      name: 'Diego Alves Mendes',
      phone: '(11) 88888-5678',
      address: 'Rua Purpurina, 350 - Vila Madalena, São Paulo - SP',
    },
    {
      id: 13,
      name: 'Amanda Costa Silva',
      phone: '(11) 87777-9012',
      address: 'Rua Girassol, 450 - Vila Madalena, São Paulo - SP',
    },
    {
      id: 14,
      name: 'Thiago Oliveira Lima',
      phone: '(11) 86666-3456',
      address: 'Rua Corifeu de Azevedo Marques, 550 - Pinheiros, São Paulo - SP',
    },
    {
      id: 15,
      name: 'Vanessa Santos Pereira',
      phone: '(11) 85555-7890',
      address: 'Rua dos Pinheiros, 750 - Pinheiros, São Paulo - SP',
    },
    {
      id: 16,
      name: 'Marcelo Lima Costa',
      phone: '(11) 84444-1234',
      address: 'Rua Artur de Azevedo, 850 - Pinheiros, São Paulo - SP',
    },
    {
      id: 17,
      name: 'Carolina Ferreira Alves',
      phone: '(11) 83333-5678',
      address: 'Rua Heitor Penteado, 950 - Sumaré, São Paulo - SP',
    },
    {
      id: 18,
      name: 'Gabriel Mendes Silva',
      phone: '(11) 82222-9012',
      address: 'Rua Simão Álvares, 1050 - Sumaré, São Paulo - SP',
    },
    {
      id: 19,
      name: 'Isabela Rodrigues Costa',
      phone: '(11) 81111-3456',
      address: 'Rua Cônego Eugênio Leite, 1150 - Pinheiros, São Paulo - SP',
    },
    {
      id: 20,
      name: 'Bruno Almeida Santos',
      phone: '(11) 80000-7890',
      address: 'Rua Butantã, 1250 - Pinheiros, São Paulo - SP',
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm) ||
      user.address.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className='py-6 flex flex-col justify-between bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>Clientes</h1>
              <p className='text-sm sm:text-base text-slate-600'>
                Gerencie o cadastro de clientes da sua loja
              </p>
            </div>
            <button
              onClick={() => navigate('/admin/clientes/adicionar')}
              className='flex items-center justify-center gap-2 sm:px-4 py-3 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg'
            >
              <Plus className='w-4 h-4' />
              Adicionar Cliente
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Search */}
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400' />
              <input
                type='text'
                placeholder='Buscar clientes...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-2 sm:py-3 text-sm border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
              />
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => setSearchTerm('')}
              className='px-4 py-2 sm:py-3 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all duration-300'
            >
              Limpar Filtros
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className='bg-slate-50 rounded-xl shadow-lg overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-slate-50 border-b border-slate-200'>
                <tr>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700'>
                    Cliente
                  </th>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700'>
                    Telefone
                  </th>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700'>
                    Endereço
                  </th>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700'>
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-200'>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className='hover:bg-slate-50 transition-colors duration-200 shadow-sm'
                  >
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-3'>
                        <div>
                          <p className='text-xs sm:text-sm font-medium text-slate-800'>
                            {user.name}
                          </p>
                          <p className='text-xs text-slate-500'>ID: {user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 text-xs sm:text-sm text-slate-700'>{user.phone}</td>
                    <td className='px-6 py-4'>
                      <p
                        className='text-xs sm:text-sm text-slate-700 max-w-xs truncate'
                        title={user.address}
                      >
                        {user.address}
                      </p>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-1 sm:gap-2'>
                        <button
                          className='p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200'
                          title='Visualizar'
                        >
                          <Eye className='w-3 h-3 sm:w-4 sm:h-4' />
                        </button>
                        <button
                          className='p-1.5 sm:p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200'
                          title='Editar'
                        >
                          <Edit className='w-3 h-3 sm:w-4 sm:h-4' />
                        </button>
                        <button
                          className='p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200'
                          title='Excluir'
                        >
                          <Trash2 className='w-3 h-3 sm:w-4 sm:h-4' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div className='text-center py-12'>
              <div className='w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center'>
                <Search className='w-8 h-8 text-slate-400' />
              </div>
              <h3 className='text-base sm:text-lg font-medium text-slate-800 mb-2'>
                Nenhum cliente encontrado
              </h3>
              <p className='text-sm sm:text-base text-slate-600'>
                Tente ajustar os filtros ou adicionar um novo cliente.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredUsers.length > 0 && (
          <div className='mt-6 flex items-center justify-between bg-white rounded-xl shadow-lg p-4'>
            <div className='text-xs sm:text-sm text-slate-600'>
              Mostrando {filteredUsers.length} de {users.length} clientes
            </div>
            <div className='flex items-center gap-2'>
              <button className='px-2 sm:px-3 py-2 text-xs sm:text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200'>
                Anterior
              </button>
              <span className='px-2 sm:px-3 py-2 bg-purple-600 text-white text-xs sm:text-sm rounded-lg'>
                1
              </span>
              <button className='px-2 sm:px-3 py-2 text-xs sm:text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200'>
                Próximo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListCustomers;
