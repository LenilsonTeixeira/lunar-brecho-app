import { useState, useEffect } from 'react';
import { Plus, Mail, Phone, Bell, Save, Trash2 } from 'lucide-react';

interface NotificationContact {
  id: number;
  type: 'email' | 'phone';
  value: string;
  name: string;
  isActive: boolean;
}

const Notification = () => {
  const [contacts, setContacts] = useState<NotificationContact[]>([
    {
      id: 1,
      type: 'email',
      value: 'admin@lunarbrecho.com',
      name: 'Email Principal',
      isActive: true,
    },
    {
      id: 2,
      type: 'phone',
      value: '(34) 99999-9999',
      name: 'WhatsApp Principal',
      isActive: true,
    },
    {
      id: 3,
      type: 'email',
      value: 'vendas@lunarbrecho.com',
      name: 'Email de Vendas',
      isActive: false,
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [newContact, setNewContact] = useState({
    type: 'email' as 'email' | 'phone',
    value: '',
    name: '',
  });

  // Carregar contatos do localStorage
  useEffect(() => {
    const savedContacts = localStorage.getItem('notificationContacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  const addContact = () => {
    if (!newContact.value.trim() || !newContact.name.trim()) return;

    const contact: NotificationContact = {
      id: Math.max(...contacts.map((c) => c.id), 0) + 1,
      type: newContact.type,
      value: newContact.value.trim(),
      name: newContact.name.trim(),
      isActive: true,
    };

    setContacts([...contacts, contact]);
    setNewContact({ type: 'email', value: '', name: '' });
  };

  const deleteContact = (id: number) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const toggleContactStatus = (id: number) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === id ? { ...contact, isActive: !contact.isActive } : contact,
      ),
    );
  };

  const handleSave = async () => {
    setIsLoading(true);
    setSaveStatus('saving');

    try {
      // Simular salvamento
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Salvar no localStorage
      localStorage.setItem('notificationContacts', JSON.stringify(contacts));

      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='py-6 flex flex-col justify-between bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>Notificações</h1>
          <p className='text-sm sm:text-base text-slate-600'>
            Gerencie os contatos para receber notificações do sistema
          </p>
        </div>

        <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'>
          {/* Add New Contact */}
          <div className='border-b border-slate-200 pb-6'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center'>
                <Plus className='w-5 h-5 text-purple-600' />
              </div>
              <h2 className='text-lg sm:text-xl font-semibold text-slate-800'>Adicionar Contato</h2>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700'>Tipo</label>
                <select
                  value={newContact.type}
                  onChange={(e) =>
                    setNewContact({ ...newContact, type: e.target.value as 'email' | 'phone' })
                  }
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                >
                  <option value='email'>Email</option>
                  <option value='phone'>Telefone</option>
                </select>
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700'>Nome</label>
                <input
                  type='text'
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  placeholder='Ex: Email Principal'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700'>
                  {newContact.type === 'email' ? 'Email' : 'Telefone'}
                </label>
                <div className='flex gap-2'>
                  <input
                    type={newContact.type === 'email' ? 'email' : 'tel'}
                    value={newContact.value}
                    onChange={(e) => setNewContact({ ...newContact, value: e.target.value })}
                    placeholder={
                      newContact.type === 'email' ? 'exemplo@email.com' : '(34) 99999-9999'
                    }
                    className='flex-1 outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  />
                  <button
                    onClick={addContact}
                    disabled={!newContact.value.trim() || !newContact.name.trim()}
                    className='px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    <Plus className='w-4 h-4' />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Contacts List */}
          <div>
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
                <Bell className='w-5 h-5 text-blue-600' />
              </div>
              <h2 className='text-lg sm:text-xl font-semibold text-slate-800'>
                Contatos Configurados
              </h2>
            </div>

            <div className='space-y-3'>
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className='flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200'
                >
                  <div className='flex items-center gap-3 flex-1'>
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        contact.type === 'email' ? 'bg-purple-100' : 'bg-green-100'
                      }`}
                    >
                      {contact.type === 'email' ? (
                        <Mail className='w-5 h-5 text-purple-600' />
                      ) : (
                        <Phone className='w-5 h-5 text-green-600' />
                      )}
                    </div>

                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-1'>
                        <p className='font-medium text-slate-800'>{contact.name}</p>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            contact.isActive
                              ? 'bg-green-100 text-green-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {contact.isActive ? 'Ativo' : 'Inativo'}
                        </span>
                      </div>
                      <p className='text-sm text-slate-600'>{contact.value}</p>
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    {/* Toggle Status */}
                    <label className='relative inline-flex items-center cursor-pointer'>
                      <input
                        type='checkbox'
                        checked={contact.isActive}
                        onChange={() => toggleContactStatus(contact.id)}
                        className='sr-only peer'
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>

                    {/* Delete Button */}
                    <button
                      onClick={() => deleteContact(contact.id)}
                      className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200'
                      title='Excluir'
                    >
                      <Trash2 className='w-4 h-4' />
                    </button>
                  </div>
                </div>
              ))}

              {contacts.length === 0 && (
                <div className='text-center py-8'>
                  <div className='w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center'>
                    <Bell className='w-8 h-8 text-slate-400' />
                  </div>
                  <h3 className='text-base font-medium text-slate-800 mb-2'>
                    Nenhum contato configurado
                  </h3>
                  <p className='text-sm text-slate-600'>
                    Adicione contatos para receber notificações do sistema.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Save Button */}
          <div className='pt-6 border-t border-slate-200'>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className='w-full py-2 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm sm:text-base font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2'
            >
              {isLoading ? (
                <>
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  Salvando...
                </>
              ) : (
                <>
                  <Save className='w-4 h-4' />
                  Salvar Configurações
                </>
              )}
            </button>

            {/* Status Messages */}
            {saveStatus === 'success' && (
              <div className='mt-3 p-3 bg-green-50 border border-green-200 rounded-lg'>
                <p className='text-sm text-green-700 font-medium'>
                  ✓ Configurações salvas com sucesso!
                </p>
              </div>
            )}

            {saveStatus === 'error' && (
              <div className='mt-3 p-3 bg-red-50 border border-red-200 rounded-lg'>
                <p className='text-sm text-red-700 font-medium'>
                  ✗ Erro ao salvar configurações. Tente novamente.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
