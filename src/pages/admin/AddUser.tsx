import { useState } from 'react';
import { Plus, X, Star, StarOff } from 'lucide-react';

const AddUser = () => {
  const [phones, setPhones] = useState([{ id: 1, phone: '' }]);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      cep: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      isMain: true,
    },
  ]);

  const addPhone = () => {
    const newId = Math.max(...phones.map((p) => p.id), 0) + 1;
    setPhones([...phones, { id: newId, phone: '' }]);
  };

  const removePhone = (id: number) => {
    if (phones.length > 1) {
      setPhones(phones.filter((p) => p.id !== id));
    }
  };

  const updatePhone = (id: number, value: string) => {
    setPhones(phones.map((p) => (p.id === id ? { ...p, phone: value } : p)));
  };

  const addAddress = () => {
    const newId = Math.max(...addresses.map((a) => a.id), 0) + 1;
    setAddresses([
      ...addresses,
      {
        id: newId,
        cep: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
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

  return (
    <div className='py-6 flex flex-col justify-between bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>Adicionar Usuário</h1>
          <p className='text-sm sm:text-base text-slate-600'>
            Preencha as informações do usuário abaixo
          </p>
        </div>

        <form className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'>
          {/* User Name */}
          <div className='flex flex-col gap-2'>
            <label
              className='text-sm sm:text-base font-semibold text-slate-700'
              htmlFor='user-name'
            >
              Nome Completo
            </label>
            <input
              id='user-name'
              type='text'
              placeholder='Digite o nome completo'
              className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
              required
            />
          </div>

          {/* Phones - Dynamic Management */}
          <div>
            <div className='flex items-center justify-between mb-4'>
              <label className='text-sm sm:text-base font-semibold text-slate-700'>Telefones</label>
              <button
                type='button'
                onClick={addPhone}
                className='flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all duration-300'
              >
                <Plus className='w-4 h-4' />
                Adicionar Telefone
              </button>
            </div>

            <div className='space-y-3'>
              {phones.map((phoneItem, index) => (
                <div
                  key={phoneItem.id}
                  className='flex items-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200'
                >
                  <div className='flex-1'>
                    <label className='text-xs sm:text-sm font-medium text-slate-600 mb-2 block'>
                      Telefone {index + 1}
                    </label>
                    <input
                      type='tel'
                      value={phoneItem.phone}
                      onChange={(e) => updatePhone(phoneItem.id, e.target.value)}
                      placeholder='(11) 99999-9999'
                      className='w-full outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                      required
                    />
                  </div>

                  {phones.length > 1 && (
                    <button
                      type='button'
                      onClick={() => removePhone(phoneItem.id)}
                      className='mt-6 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300'
                      aria-label='Remover telefone'
                    >
                      <X className='w-4 h-4' />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Addresses - Dynamic Management */}
          <div>
            <div className='flex items-center justify-between mb-4'>
              <label className='text-sm sm:text-base font-semibold text-slate-700'>
                Endereços de Entrega
              </label>
              <button
                type='button'
                onClick={addAddress}
                className='flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all duration-300'
              >
                <Plus className='w-4 h-4' />
                Adicionar Endereço
              </button>
            </div>

            <div className='space-y-6'>
              {addresses.map((addressItem, index) => (
                <div
                  key={addressItem.id}
                  className='p-6 bg-slate-50 rounded-lg border border-slate-200'
                >
                  {/* Address Header */}
                  <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center gap-3'>
                      <h4 className='text-sm sm:text-base font-semibold text-slate-800'>
                        Endereço {index + 1}
                      </h4>
                      {addressItem.isMain && (
                        <span className='flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full'>
                          <Star className='w-3 h-3' />
                          Principal
                        </span>
                      )}
                    </div>
                    <div className='flex items-center gap-2'>
                      {!addressItem.isMain && (
                        <button
                          type='button'
                          onClick={() => setMainAddress(addressItem.id)}
                          className='p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-300'
                          title='Definir como principal'
                        >
                          <StarOff className='w-4 h-4' />
                        </button>
                      )}
                      {addresses.length > 1 && (
                        <button
                          type='button'
                          onClick={() => removeAddress(addressItem.id)}
                          className='p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300'
                          aria-label='Remover endereço'
                        >
                          <X className='w-4 h-4' />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Address Fields */}
                  <div className='space-y-4'>
                    {/* CEP and Street */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                      <div className='flex flex-col gap-2'>
                        <label
                          className='text-xs sm:text-sm font-medium text-slate-600'
                          htmlFor={`cep-${addressItem.id}`}
                        >
                          CEP
                        </label>
                        <input
                          id={`cep-${addressItem.id}`}
                          type='text'
                          value={addressItem.cep}
                          onChange={(e) => updateAddress(addressItem.id, 'cep', e.target.value)}
                          placeholder='00000-000'
                          className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                          required
                        />
                      </div>

                      <div className='flex flex-col gap-2'>
                        <label
                          className='text-xs sm:text-sm font-medium text-slate-600'
                          htmlFor={`street-${addressItem.id}`}
                        >
                          Rua
                        </label>
                        <input
                          id={`street-${addressItem.id}`}
                          type='text'
                          value={addressItem.street}
                          onChange={(e) => updateAddress(addressItem.id, 'street', e.target.value)}
                          placeholder='Nome da rua'
                          className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                          required
                        />
                      </div>
                    </div>

                    {/* Number and Complement */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                      <div className='flex flex-col gap-2'>
                        <label
                          className='text-xs sm:text-sm font-medium text-slate-600'
                          htmlFor={`number-${addressItem.id}`}
                        >
                          Número
                        </label>
                        <input
                          id={`number-${addressItem.id}`}
                          type='text'
                          value={addressItem.number}
                          onChange={(e) => updateAddress(addressItem.id, 'number', e.target.value)}
                          placeholder='123'
                          className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                          required
                        />
                      </div>

                      <div className='flex flex-col gap-2'>
                        <label
                          className='text-xs sm:text-sm font-medium text-slate-600'
                          htmlFor={`complement-${addressItem.id}`}
                        >
                          Complemento
                        </label>
                        <input
                          id={`complement-${addressItem.id}`}
                          type='text'
                          value={addressItem.complement}
                          onChange={(e) =>
                            updateAddress(addressItem.id, 'complement', e.target.value)
                          }
                          placeholder='Apartamento, bloco, etc.'
                          className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                        />
                      </div>
                    </div>

                    {/* Neighborhood and City */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                      <div className='flex flex-col gap-2'>
                        <label
                          className='text-xs sm:text-sm font-medium text-slate-600'
                          htmlFor={`neighborhood-${addressItem.id}`}
                        >
                          Bairro
                        </label>
                        <input
                          id={`neighborhood-${addressItem.id}`}
                          type='text'
                          value={addressItem.neighborhood}
                          onChange={(e) =>
                            updateAddress(addressItem.id, 'neighborhood', e.target.value)
                          }
                          placeholder='Nome do bairro'
                          className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                          required
                        />
                      </div>

                      <div className='flex flex-col gap-2'>
                        <label
                          className='text-xs sm:text-sm font-medium text-slate-600'
                          htmlFor={`city-${addressItem.id}`}
                        >
                          Cidade
                        </label>
                        <input
                          id={`city-${addressItem.id}`}
                          type='text'
                          value={addressItem.city}
                          onChange={(e) => updateAddress(addressItem.id, 'city', e.target.value)}
                          placeholder='Nome da cidade'
                          className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                          required
                        />
                      </div>
                    </div>

                    {/* State */}
                    <div className='flex flex-col gap-2'>
                      <label
                        className='text-xs sm:text-sm font-medium text-slate-600'
                        htmlFor={`state-${addressItem.id}`}
                      >
                        Estado
                      </label>
                      <select
                        id={`state-${addressItem.id}`}
                        value={addressItem.state}
                        onChange={(e) => updateAddress(addressItem.id, 'state', e.target.value)}
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
              Adicionar Usuário
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
