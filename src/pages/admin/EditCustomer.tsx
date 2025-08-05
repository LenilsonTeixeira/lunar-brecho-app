import { useState, useEffect } from 'react';
import { Plus, X, User, Phone, MapPin, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

interface CustomerPhone {
  id: number;
  number: string;
}

interface CustomerAddress {
  id: number;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isMain: boolean;
}

interface Customer {
  id: number;
  name: string;
  phones: CustomerPhone[];
  addresses: CustomerAddress[];
}

const EditCustomer = () => {
  const navigate = useNavigate();
  const { customerId } = useParams();

  // Mock data - em uma aplicação real, isso viria de uma API
  const mockCustomer: Customer = {
    id: parseInt(customerId || '1'),
    name: 'Maria Silva Santos',
    phones: [{ id: 1, number: '(11) 99999-1234' }],
    addresses: [
      {
        id: 1,
        street: 'Rua das Flores',
        number: '123',
        complement: 'Apto 101',
        neighborhood: 'Vila Madalena',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
        isMain: true,
      },
    ],
  };

  const [customer] = useState<Customer>(mockCustomer);
  const [customerName, setCustomerName] = useState(mockCustomer.name);
  const [phones, setPhones] = useState<CustomerPhone[]>(mockCustomer.phones);
  const [addresses, setAddresses] = useState<CustomerAddress[]>(mockCustomer.addresses);

  useEffect(() => {
    // Em uma aplicação real, aqui você faria uma chamada para a API
    // para buscar os dados do cliente pelo customerId
    console.log('Carregando cliente:', customerId);
  }, [customerId]);

  const addPhone = () => {
    const newId = Math.max(...phones.map((p) => p.id), 0) + 1;
    setPhones([
      ...phones,
      {
        id: newId,
        number: '',
      },
    ]);
  };

  const removePhone = (id: number) => {
    if (phones.length > 1) {
      setPhones(phones.filter((p) => p.id !== id));
    }
  };

  const updatePhone = (id: number, value: string) => {
    setPhones(phones.map((p) => (p.id === id ? { ...p, number: value } : p)));
  };

  const addAddress = () => {
    const newId = Math.max(...addresses.map((a) => a.id), 0) + 1;
    setAddresses([
      ...addresses,
      {
        id: newId,
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: '',
        isMain: false,
      },
    ]);
  };

  const removeAddress = (id: number) => {
    if (addresses.length > 1) {
      setAddresses(addresses.filter((a) => a.id !== id));
    }
  };

  const updateAddress = (id: number, field: string, value: string | boolean) => {
    setAddresses(addresses.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  };

  const setMainAddress = (id: number) => {
    setAddresses(
      addresses.map((a) => ({
        ...a,
        isMain: a.id === id,
      })),
    );
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return value;
  };

  const formatZipCode = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{5})(\d{3})$/);
    if (match) {
      return `${match[1]}-${match[2]}`;
    }
    return value;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar se todos os campos obrigatórios estão preenchidos
    if (!customerName.trim()) {
      alert('Por favor, preencha o nome do cliente.');
      return;
    }

    // Validar telefones
    const invalidPhones = phones.filter((p) => !p.number.trim());
    if (invalidPhones.length > 0) {
      alert('Por favor, preencha todos os telefones.');
      return;
    }

    // Validar endereços
    const invalidAddresses = addresses.filter(
      (a) =>
        !a.street.trim() ||
        !a.number.trim() ||
        !a.neighborhood.trim() ||
        !a.city.trim() ||
        !a.state.trim() ||
        !a.zipCode.trim(),
    );
    if (invalidAddresses.length > 0) {
      alert('Por favor, preencha todos os campos obrigatórios dos endereços.');
      return;
    }

    // Simular atualização do cliente
    const updatedCustomer = {
      ...customer,
      name: customerName,
      phones,
      addresses,
    };

    console.log('Cliente atualizado:', updatedCustomer);
    alert('Cliente atualizado com sucesso!');

    // Navegar de volta para a lista de clientes
    navigate('/admin/clientes');
  };

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
            Editar Cliente #{customer.id}
          </h1>
          <p className='text-sm sm:text-base text-slate-600'>
            Modifique as informações do cliente abaixo
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'
        >
          {/* Informações Básicas */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <User className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações Básicas</h3>
            </div>

            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='customer-name'>
                  Nome Completo *
                </label>
                <input
                  id='customer-name'
                  type='text'
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder='Digite o nome completo'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>
            </div>
          </div>

          {/* Telefones */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-3'>
                <Phone className='w-5 h-5 text-purple-600' />
                <h3 className='text-lg font-semibold text-slate-800'>Telefones</h3>
              </div>
              <button
                type='button'
                onClick={addPhone}
                className='flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all duration-300'
              >
                <Plus className='w-4 h-4' />
                Adicionar Telefone
              </button>
            </div>

            <div className='space-y-4'>
              {phones.map((phone, index) => (
                <div key={phone.id} className='p-4 bg-white rounded-lg border border-slate-200'>
                  <div className='flex items-center justify-between mb-3'>
                    <h4 className='text-sm font-semibold text-slate-800'>Telefone {index + 1}</h4>
                  </div>

                  <div className='flex items-center gap-4'>
                    <div className='flex-1'>
                      <input
                        type='tel'
                        value={phone.number}
                        onChange={(e) => updatePhone(phone.id, formatPhone(e.target.value))}
                        placeholder='(11) 99999-9999'
                        className='w-full outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                        required
                      />
                    </div>

                    {phones.length > 1 && (
                      <button
                        type='button'
                        onClick={() => removePhone(phone.id)}
                        className='p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300'
                        aria-label='Remover telefone'
                      >
                        <X className='w-4 h-4' />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Endereços */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-3'>
                <MapPin className='w-5 h-5 text-purple-600' />
                <h3 className='text-lg font-semibold text-slate-800'>Endereços</h3>
              </div>
              <button
                type='button'
                onClick={addAddress}
                className='flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all duration-300'
              >
                <Plus className='w-4 h-4' />
                Adicionar Endereço
              </button>
            </div>

            <div className='space-y-4'>
              {addresses.map((address, index) => (
                <div key={address.id} className='p-4 bg-white rounded-lg border border-slate-200'>
                  <div className='flex items-center justify-between mb-3'>
                    <h4 className='text-sm font-semibold text-slate-800'>Endereço {index + 1}</h4>
                    <label className='flex items-center gap-2 cursor-pointer'>
                      <input
                        type='radio'
                        name='mainAddress'
                        checked={address.isMain}
                        onChange={() => setMainAddress(address.id)}
                        className='w-4 h-4 text-purple-600 border-slate-300 focus:ring-purple-500'
                      />
                      <span className='text-xs text-slate-600'>Endereço Principal</span>
                    </label>
                  </div>

                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-2'>
                      <label className='text-xs sm:text-sm font-medium text-slate-600'>CEP *</label>
                      <input
                        type='text'
                        value={address.zipCode}
                        onChange={(e) =>
                          updateAddress(address.id, 'zipCode', formatZipCode(e.target.value))
                        }
                        placeholder='00000-000'
                        className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                        required
                      />
                    </div>

                    <div className='flex flex-col gap-2'>
                      <label className='text-xs sm:text-sm font-medium text-slate-600'>Rua *</label>
                      <input
                        type='text'
                        value={address.street}
                        onChange={(e) => updateAddress(address.id, 'street', e.target.value)}
                        placeholder='Nome da rua'
                        className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                        required
                      />
                    </div>

                    <div className='flex flex-col gap-2'>
                      <label className='text-xs sm:text-sm font-medium text-slate-600'>
                        Número *
                      </label>
                      <input
                        type='text'
                        value={address.number}
                        onChange={(e) => updateAddress(address.id, 'number', e.target.value)}
                        placeholder='123'
                        className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                        required
                      />
                    </div>

                    <div className='flex flex-col gap-2'>
                      <label className='text-xs sm:text-sm font-medium text-slate-600'>
                        Complemento
                      </label>
                      <input
                        type='text'
                        value={address.complement}
                        onChange={(e) => updateAddress(address.id, 'complement', e.target.value)}
                        placeholder='Apartamento, bloco, etc.'
                        className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                      />
                    </div>

                    <div className='flex flex-col gap-2'>
                      <label className='text-xs sm:text-sm font-medium text-slate-600'>
                        Bairro *
                      </label>
                      <input
                        type='text'
                        value={address.neighborhood}
                        onChange={(e) => updateAddress(address.id, 'neighborhood', e.target.value)}
                        placeholder='Nome do bairro'
                        className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                        required
                      />
                    </div>

                    <div className='flex flex-col gap-2'>
                      <label className='text-xs sm:text-sm font-medium text-slate-600'>
                        Cidade *
                      </label>
                      <input
                        type='text'
                        value={address.city}
                        onChange={(e) => updateAddress(address.id, 'city', e.target.value)}
                        placeholder='Nome da cidade'
                        className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                        required
                      />
                    </div>

                    <div className='flex flex-col gap-2'>
                      <label className='text-xs sm:text-sm font-medium text-slate-600'>
                        Estado *
                      </label>
                      <select
                        value={address.state}
                        onChange={(e) => updateAddress(address.id, 'state', e.target.value)}
                        className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                        required
                      >
                        <option value=''>Selecione o estado</option>
                        <option value='SP'>São Paulo</option>
                        <option value='RJ'>Rio de Janeiro</option>
                        <option value='MG'>Minas Gerais</option>
                        <option value='RS'>Rio Grande do Sul</option>
                        <option value='PR'>Paraná</option>
                        <option value='SC'>Santa Catarina</option>
                        <option value='BA'>Bahia</option>
                        <option value='GO'>Goiás</option>
                        <option value='PE'>Pernambuco</option>
                        <option value='CE'>Ceará</option>
                        <option value='PA'>Pará</option>
                        <option value='MA'>Maranhão</option>
                        <option value='ES'>Espírito Santo</option>
                        <option value='PB'>Paraíba</option>
                        <option value='MT'>Mato Grosso</option>
                        <option value='MS'>Mato Grosso do Sul</option>
                        <option value='PI'>Piauí</option>
                        <option value='RN'>Rio Grande do Norte</option>
                        <option value='AL'>Alagoas</option>
                        <option value='SE'>Sergipe</option>
                        <option value='RO'>Rondônia</option>
                        <option value='TO'>Tocantins</option>
                        <option value='AC'>Acre</option>
                        <option value='AP'>Amapá</option>
                        <option value='AM'>Amazonas</option>
                        <option value='RR'>Roraima</option>
                        <option value='DF'>Distrito Federal</option>
                      </select>
                    </div>

                    {addresses.length > 1 && (
                      <div className='flex flex-col gap-2'>
                        <label className='text-xs sm:text-sm font-medium text-slate-600'>
                          &nbsp;
                        </label>
                        <button
                          type='button'
                          onClick={() => removeAddress(address.id)}
                          className='p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300'
                          aria-label='Remover endereço'
                        >
                          <X className='w-4 h-4' />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className='pt-4'>
            <button
              type='submit'
              className='w-full py-2 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm sm:text-base font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
            >
              Atualizar Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCustomer;
