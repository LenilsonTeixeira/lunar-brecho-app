import {
  Clock,
  MapPin,
  Phone,
  Instagram,
  Truck,
  CreditCard,
  Package,
  ShoppingBag,
} from 'lucide-react';
import Container from '../components/layout/Container';

const GeneralInfo = () => {
  const infoSections = [
    {
      icon: <MapPin className='w-5 h-5 text-amber-500' />,
      title: 'Localização',
      content: ['Avenida Camilo Chaves, 479', 'Bairro Platina', 'Ituiutaba/MG'],
    },
    {
      icon: <ShoppingBag className='w-5 h-5 text-purple-500' />,
      title: 'Como Comprar',
      content: ['Vendas online via Instagram', 'Stories e feed ativos', 'Disponível 24h'],
    },
    {
      icon: <Clock className='w-5 h-5 text-emerald-500' />,
      title: 'Horário',
      content: ['Retiradas: 17h às 19h', 'Vendas online: 24h', 'Alterações via stories'],
    },
    {
      icon: <Truck className='w-5 h-5 text-pink-500' />,
      title: 'Entrega',
      content: ['Correios nacional', 'Taxa local: R$ 6,00', 'Método sacolinha'],
    },
  ];

  const paymentMethods = [
    {
      icon: <CreditCard className='w-5 h-5 text-emerald-500' />,
      title: 'PIX',
      description: 'Instantâneo e seguro',
    },
    {
      icon: <CreditCard className='w-5 h-5 text-blue-500' />,
      title: 'Crédito',
      description: 'Parcelamento até 12x',
    },
    {
      icon: <CreditCard className='w-5 h-5 text-purple-500' />,
      title: 'Débito',
      description: 'Pagamento à vista',
    },
    {
      icon: <Package className='w-5 h-5 text-amber-500' />,
      title: 'Dinheiro',
      description: 'Na retirada',
    },
  ];

  const rules = [
    {
      title: 'Reserva',
      description: 'Garantida com primeiro pagamento via PIX ou link.',
    },
    {
      title: 'Pagamento Presencial',
      description: 'Dinheiro, débito ou crédito disponíveis na retirada.',
    },
    {
      title: 'Experimentação',
      description: 'Aberto para provas quando não há fila de espera.',
    },
    {
      title: 'Trocas',
      description: 'Aceitas em até 48 horas após a compra online.',
    },
    {
      title: 'Peças Novas',
      description: 'Trabalhamos com peças novas e preços acessíveis.',
    },
    {
      title: 'Consignado',
      description: 'Prazo de 20 a 30 dias para acerto das peças.',
    },
  ];

  return (
    <Container>
      <div className='py-6 sm:py-8'>
        {/* Header */}
        <div className='text-center mb-8 sm:mb-12'>
          <div className='flex justify-center mb-4'>
            <div className='p-3 rounded-full bg-slate-900'>
              <ShoppingBag className='w-8 h-8 text-white' />
            </div>
          </div>
          <h1 className='font-bold text-2xl sm:text-3xl text-slate-800 mb-2'>Lunar Brechó</h1>
          <p className='text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-6'>
            Moda sustentável com peças únicas e acessíveis
          </p>
          <div className='flex flex-col sm:flex-row gap-3 justify-center'>
            <a
              href='https://wa.me/5534996962488'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center justify-center gap-2 bg-emerald-500 text-white px-6 py-2 text-sm font-medium hover:bg-emerald-600 transition-colors rounded-lg'
            >
              <Phone className='w-4 h-4' />
              WhatsApp
            </a>
            <a
              href='https://instagram.com/brecholunaritba'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center justify-center gap-2 border border-purple-500 text-purple-500 px-6 py-2 text-sm font-medium hover:bg-purple-500/10 transition-colors rounded-lg'
            >
              <Instagram className='w-4 h-4' />
              Instagram
            </a>
          </div>
        </div>

        {/* Informações Básicas */}
        <div className='mb-8 sm:mb-12'>
          <h2 className='font-bold text-lg sm:text-xl text-slate-800 mb-4'>Informações</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
            {infoSections.map((section, index) => (
              <div
                key={index}
                className='p-4 sm:p-6 border border-slate-200 bg-white rounded-lg transition-all duration-300 hover:shadow-lg hover:border-slate-300'
              >
                <div className='mb-3'>{section.icon}</div>
                <h3 className='font-medium text-sm sm:text-base text-slate-800 mb-3'>
                  {section.title}
                </h3>
                <ul className='space-y-2'>
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className='text-slate-600 text-sm flex items-start'>
                      <span className='w-1 h-1 bg-slate-400 rounded-full mt-2 mr-3 flex-shrink-0'></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Formas de Pagamento */}
        <div className='mb-8 sm:mb-12'>
          <h2 className='font-bold text-lg sm:text-xl text-slate-800 mb-4'>Formas de Pagamento</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
            {paymentMethods.map((method, index) => {
              const colors = [
                'bg-emerald-50 border-emerald-200',
                'bg-blue-50 border-blue-200',
                'bg-purple-50 border-purple-200',
                'bg-amber-50 border-amber-200',
              ];
              return (
                <div
                  key={index}
                  className={`text-center p-4 border rounded-lg transition-all duration-300 hover:shadow-lg ${colors[index]}`}
                >
                  <div className='flex justify-center mb-3'>{method.icon}</div>
                  <h4 className='font-medium text-sm sm:text-base text-slate-800 mb-2'>
                    {method.title}
                  </h4>
                  <p className='text-slate-600 text-sm'>{method.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Políticas da Loja */}
        <div className='mb-8 sm:mb-12'>
          <h2 className='font-bold text-lg sm:text-xl text-slate-800 mb-4'>Políticas da Loja</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
            {rules.map((rule, index) => (
              <div
                key={index}
                className='p-4 sm:p-6 border border-slate-200 bg-white rounded-lg transition-all duration-300 hover:shadow-lg hover:border-slate-300'
              >
                <h4 className='font-medium text-sm sm:text-base text-slate-800 mb-2'>
                  {rule.title}
                </h4>
                <p className='text-slate-600 text-sm leading-relaxed'>{rule.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Como Funciona */}
        <div className='mb-8 sm:mb-12'>
          <h2 className='font-bold text-lg sm:text-xl text-slate-800 mb-4'>Como Funciona</h2>
          <div className='space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed'>
            <p>
              Nosso foco principal são as vendas online, oferecendo{' '}
              <span className='text-purple-600 font-medium'>flexibilidade total</span>. Você pode
              comprar a qualquer hora, de qualquer lugar, com total comodidade.
            </p>
            <p>
              As vendas acontecem diariamente via stories do Instagram. Fique atento às publicações
              para não perder as{' '}
              <span className='text-pink-600 font-medium'>novidades e peças exclusivas</span>.
            </p>
            <p>
              Oferecemos o método <span className='text-emerald-600 font-medium'>"sacolinha"</span>:
              escolha várias peças pelos stories, realize um único pagamento e guardamos tudo para
              envio conjunto. Resultado: você economiza no frete!
            </p>
            <div className='bg-white p-4 sm:p-6 rounded-lg border border-slate-200'>
              <p>
                <span className='text-amber-600 font-medium'>Entregas locais</span> com taxa fixa de
                R$ 6,00 para qualquer ponto da cidade. Horários alternativos podem ser combinados
                diretamente para maior conveniência.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className='bg-slate-900 text-white p-6 sm:p-8 rounded-lg'>
          <div className='text-center'>
            <h2 className='font-bold text-lg sm:text-xl mb-3'>Encontre seu estilo único</h2>
            <p className='text-sm sm:text-base text-slate-300 mb-6'>
              Explore nossa coleção e descubra peças especiais
            </p>
            <div className='flex flex-col sm:flex-row gap-3 justify-center'>
              <a
                href='/'
                className='bg-purple-500 text-white px-6 py-2 text-sm font-medium hover:bg-purple-600 transition-colors rounded-lg'
              >
                Ver Produtos
              </a>
              <a
                href='https://wa.me/5534996962488'
                target='_blank'
                rel='noopener noreferrer'
                className='border border-emerald-500 text-white px-6 py-2 text-sm font-medium hover:bg-emerald-500/10 transition-colors rounded-lg'
              >
                Tirar Dúvidas
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default GeneralInfo;
