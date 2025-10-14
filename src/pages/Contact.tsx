import { Phone, Instagram, MapPin, MessageCircle } from 'lucide-react';
import Container from '../components/layout/Container';

const Contact = () => {
  const contactMethods = [
    {
      icon: <Phone className='w-5 h-5 text-emerald-500' />,
      title: 'WhatsApp Luane',
      description: '(34) 99696-2488',
      link: 'https://wa.me/5534996962488',
    },
    {
      icon: <Phone className='w-5 h-5 text-emerald-500' />,
      title: 'WhatsApp Lilian',
      description: '(34) 99668-3137',
      link: 'https://wa.me/5534996683137',
    },
    {
      icon: <Instagram className='w-5 h-5 text-pink-500' />,
      title: 'Instagram',
      description: '@brecholunar.itba',
      link: 'https://www.instagram.com/brecholunar.itba/',
    },
  ];

  const locationInfo = [
    {
      icon: <MapPin className='w-5 h-5 text-amber-500' />,
      title: 'Endereço',
      content: ['Avenida Camilo Chaves, 479', 'Bairro Platina'],
    },
  ];

  const quickActions = [
    {
      icon: <MessageCircle className='w-5 h-5 text-emerald-500' />,
      title: 'Chat Rápido',
      description: 'Envie uma mensagem via WhatsApp',
      action: 'Enviar Mensagem',
      link: 'https://wa.me/5534996962488',
    },
    {
      icon: <Instagram className='w-5 h-5 text-pink-500' />,
      title: 'Siga-nos',
      description: 'Acompanhe nossas novidades',
      action: 'Ver Instagram',
      link: 'https://www.instagram.com/brecholunar.itba/',
    },
  ];

  return (
    <Container>
      <div className='py-6 sm:py-8'>
        {/* Header */}
        <div className='text-center mb-8 sm:mb-12'>
          <div className='flex justify-center mb-4'>
            <div className='p-3 rounded-full bg-slate-900'>
              <MessageCircle className='w-8 h-8 text-white' />
            </div>
          </div>
          <h1 className='font-bold text-2xl sm:text-3xl text-slate-800 mb-2'>Contato</h1>
          <p className='text-sm sm:text-base text-slate-600 max-w-2xl mx-auto'>
            Entre em contato conosco
          </p>
        </div>

        {/* Informações de Contato */}
        <div className='mb-8 sm:mb-12'>
          <h2 className='font-bold text-lg sm:text-xl text-slate-800 mb-4'>Fale Conosco</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6'>
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.link}
                target='_blank'
                rel='noopener noreferrer'
                className='p-4 sm:p-6 border border-slate-200 bg-white rounded-lg transition-all duration-300 hover:shadow-lg hover:border-slate-300'
              >
                <div className='mb-3'>{method.icon}</div>
                <h3 className='font-medium text-sm sm:text-base text-slate-800 mb-2'>
                  {method.title}
                </h3>
                <p className='text-slate-600 text-sm'>{method.description}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Localização */}
        <div className='mb-8 sm:mb-12'>
          <h2 className='font-bold text-lg sm:text-xl text-slate-800 mb-4'>Localização</h2>
          <div className='grid grid-cols-1 gap-4 sm:gap-6'>
            {locationInfo.map((location, index) => (
              <div
                key={index}
                className='p-4 sm:p-6 border border-slate-200 bg-white rounded-lg transition-all duration-300 hover:shadow-lg hover:border-slate-300'
              >
                <div className='mb-3'>{location.icon}</div>
                <h3 className='font-medium text-sm sm:text-base text-slate-800 mb-3'>
                  {location.title}
                </h3>
                <ul className='space-y-2'>
                  {location.content.map((item, itemIndex) => (
                    <li key={itemIndex} className='text-slate-600 text-sm flex items-start'>
                      <span className='w-1 h-1 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0'></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className='mb-8 sm:mb-12'>
          <h2 className='font-bold text-lg sm:text-xl text-slate-800 mb-4'>Ações Rápidas</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
            {quickActions.map((action, index) => (
              <a
                key={index}
                href={action.link}
                target='_blank'
                rel='noopener noreferrer'
                className='p-4 sm:p-6 border border-slate-200 bg-white rounded-lg transition-all duration-300 hover:shadow-lg hover:border-slate-300'
              >
                <div className='mb-3'>{action.icon}</div>
                <h4 className='font-medium text-sm sm:text-base text-slate-800 mb-2'>
                  {action.title}
                </h4>
                <p className='text-slate-600 text-sm mb-3'>{action.description}</p>
                <span className='text-xs border-b text-slate-500 border-slate-300'>
                  {action.action}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Informações da Loja */}
        <div className='mb-8 sm:mb-12'>
          <h2 className='font-bold text-lg sm:text-xl text-slate-800 mb-4'>Brechó Lunar 🌙</h2>
          <div className='space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed'>
            <p>
              Estamos aqui para tornar sua experiência de compra única e especial. Nossa equipe está
              sempre pronta para{' '}
              <span className='text-purple-600 font-medium'>
                ajudar você a encontrar as peças perfeitas
              </span>{' '}
              e esclarecer qualquer dúvida.
            </p>
            <p>
              <span className='text-emerald-600 font-medium'>WhatsApp</span> é nosso canal principal
              para compras e informações sobre produtos. Para ficar por dentro das{' '}
              <span className='text-pink-600 font-medium'>novidades e lançamentos exclusivos</span>,
              siga-nos no Instagram.
            </p>
            <div className='bg-white p-4 sm:p-6 rounded-lg border border-slate-200'>
              <p>
                <span className='text-amber-600 font-medium'>Horário de atendimento:</span> Segunda
                a Sexta, das 17h às 19h para retiradas.{' '}
                <span className='text-purple-600 font-medium'>Vendas online disponíveis 24h</span>{' '}
                para sua comodidade.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className='bg-slate-900 text-white p-6 sm:p-8 rounded-lg'>
          <div className='text-center'>
            <h2 className='font-bold text-lg sm:text-xl mb-3'>Pronta para começar?</h2>
            <p className='text-sm sm:text-base text-slate-300 mb-6'>
              Entre em contato e descubra peças incríveis
            </p>
            <div className='flex flex-col sm:flex-row gap-3 justify-center'>
              <a
                href='https://wa.me/5534996962488'
                target='_blank'
                rel='noopener noreferrer'
                className='bg-emerald-500 text-white px-6 py-2 text-sm font-medium hover:bg-emerald-600 transition-colors rounded-lg'
              >
                Falar no WhatsApp
              </a>
              <a
                href='https://www.instagram.com/brecholunar.itba/'
                target='_blank'
                rel='noopener noreferrer'
                className='border border-purple-500 text-white px-6 py-2 text-sm font-medium hover:bg-purple-500/10 transition-colors rounded-lg'
              >
                Ver Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Contact;
