import { Phone, Instagram, MapPin, ArrowLeft, MessageCircle } from 'lucide-react';

const Contact = () => {
  const contactMethods = [
    {
      icon: <Phone className='w-6 h-6' />,
      title: 'WhatsApp Luane',
      description: '(34) 99696-2488',
      link: 'https://wa.me/5534996962488',
      primary: true,
    },
    {
      icon: <Phone className='w-6 h-6' />,
      title: 'WhatsApp Lilian',
      description: '(34) 99668-3137',
      link: 'https://wa.me/5534996683137',
      primary: true,
    },
    {
      icon: <Instagram className='w-6 h-6' />,
      title: 'Instagram',
      description: '@brecholunar.itba',
      link: 'https://www.instagram.com/brecholunar.itba/',
      primary: false,
    },
  ];

  const locationInfo = [
    {
      icon: <MapPin className='w-6 h-6' />,
      title: 'Endereço',
      content: ['Avenida Camilo Chaves, 479', 'Bairro Platina'],
    },
  ];

  const quickActions = [
    {
      icon: <MessageCircle className='w-6 h-6' />,
      title: 'Chat Rápido',
      description: 'Envie uma mensagem via WhatsApp',
      action: 'Enviar Mensagem',
      link: 'https://wa.me/5534996962488',
    },
    {
      icon: <Instagram className='w-6 h-6' />,
      title: 'Siga-nos',
      description: 'Acompanhe nossas novidades',
      action: 'Ver Instagram',
      link: 'https://www.instagram.com/brecholunar.itba/',
    },
  ];

  return (
    <div className='min-h-screen mt-10 sm:mt-20 bg-white'>
      {/* Header */}
      <div className='bg-slate-900 text-white'>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
          <div className='text-center'>
            <div className='flex justify-center mb-6'>
              <MessageCircle className='w-12 h-12 text-slate-400' strokeWidth={1.5} />
            </div>
            <h1 className='text-4xl md:text-5xl font-light mb-4 tracking-tight'>Contato</h1>
            <p className='text-lg text-slate-400 mb-8 max-w-2xl mx-auto font-light'>
              Entre em contato conosco
            </p>
            <a
              href='/'
              className='inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 text-sm font-light'
            >
              <ArrowLeft className='w-4 h-4' />
              Voltar
            </a>
          </div>
        </div>
      </div>

      {/* Informações de Contato */}
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-light text-slate-900 mb-3 tracking-tight'>
            Fale Conosco
          </h2>
          <div className='w-12 h-px bg-slate-300 mx-auto'></div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-20'>
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.link}
              target='_blank'
              rel='noopener noreferrer'
              className={`p-6 border transition-all duration-300 hover:border-slate-300 ${
                method.primary
                  ? 'bg-slate-50 border-slate-200 hover:bg-white'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className='text-slate-400 mb-4'>{method.icon}</div>
              <h3 className='text-lg font-normal text-slate-900 mb-2'>{method.title}</h3>
              <p className='text-slate-600 text-sm font-light'>{method.description}</p>
            </a>
          ))}
        </div>

        {/* Localização */}
        <div className='mb-20'>
          <div className='text-center mb-12'>
            <h3 className='text-2xl font-light text-slate-900 mb-3 tracking-tight'>Localização</h3>
            <div className='w-12 h-px bg-slate-300 mx-auto'></div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-1 gap-6'>
            {locationInfo.map((location, index) => (
              <div
                key={index}
                className='p-6 border border-slate-200 bg-white transition-all duration-300 hover:border-slate-300'
              >
                <div className='text-slate-400 mb-4'>{location.icon}</div>
                <h3 className='text-lg font-normal text-slate-900 mb-4'>{location.title}</h3>
                <ul className='space-y-2'>
                  {location.content.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className='text-slate-600 text-sm font-light flex items-start'
                    >
                      <span className='w-1 h-1 bg-slate-400 rounded-full mt-2 mr-3 flex-shrink-0'></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className='mb-20'>
          <div className='text-center mb-12'>
            <h3 className='text-2xl font-light text-slate-900 mb-3 tracking-tight'>
              Ações Rápidas
            </h3>
            <div className='w-12 h-px bg-slate-300 mx-auto'></div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {quickActions.map((action, index) => (
              <a
                key={index}
                href={action.link}
                target='_blank'
                rel='noopener noreferrer'
                className='p-6 border border-slate-200 bg-slate-50 transition-all duration-300 hover:bg-white hover:border-slate-300'
              >
                <div className='text-slate-400 mb-4'>{action.icon}</div>
                <h4 className='text-base font-normal text-slate-900 mb-2'>{action.title}</h4>
                <p className='text-slate-600 text-sm font-light mb-4'>{action.description}</p>
                <span className='text-slate-500 text-xs font-light border-b border-slate-300'>
                  {action.action}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Informações da Loja */}
        <div className='bg-slate-50 p-12 border border-slate-200'>
          <div className='text-center mb-8'>
            <h3 className='text-2xl font-light text-slate-900 mb-3 tracking-tight'>
              Brechó Lunar 🌙
            </h3>
            <div className='w-12 h-px bg-slate-300 mx-auto'></div>
          </div>

          <div className='max-w-3xl mx-auto space-y-6 text-slate-600 text-sm font-light leading-relaxed text-center'>
            <p>
              Estamos sempre disponíveis para ajudar e esclarecer suas dúvidas. Entre em contato
              conosco através dos canais acima e responderemos o mais rápido possível.
            </p>
            <p>
              Para compras e informações sobre produtos, utilize nossos canais de WhatsApp. Para
              acompanhar novidades e lançamentos, siga-nos no Instagram.
            </p>
            <p>
              Horário de atendimento: Segunda a Sexta, das 17h às 19h para retiradas. Vendas online
              disponíveis 24h.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className='bg-slate-900 text-white py-20'>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl md:text-4xl font-light mb-4 tracking-tight'>
            Pronta para começar?
          </h2>
          <p className='text-base text-slate-400 mb-10 font-light'>
            Entre em contato e descubra peças incríveis
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <a
              href='https://wa.me/5534996962488'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-white text-slate-900 px-8 py-3 font-light hover:bg-slate-100 transition-colors duration-200 text-sm'
            >
              Falar no WhatsApp
            </a>
            <a
              href='https://www.instagram.com/brecholunar.itba/'
              target='_blank'
              rel='noopener noreferrer'
              className='border border-slate-600 text-white px-8 py-3 font-light hover:bg-slate-800 transition-colors duration-200 text-sm'
            >
              Ver Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
