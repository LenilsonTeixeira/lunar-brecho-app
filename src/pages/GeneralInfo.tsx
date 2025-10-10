import {
  Clock,
  MapPin,
  Phone,
  Instagram,
  Truck,
  CreditCard,
  Package,
  ShoppingBag,
  ArrowLeft,
} from 'lucide-react';

const GeneralInfo = () => {
  const infoSections = [
    {
      icon: <MapPin className='w-6 h-6' />,
      title: 'Localização',
      content: ['Avenida Camilo Chaves, 479', 'Bairro Platina', 'Ituiutaba/MG'],
    },
    {
      icon: <ShoppingBag className='w-6 h-6' />,
      title: 'Como Comprar',
      content: ['Vendas online via Instagram', 'Stories e feed ativos', 'Disponível 24h'],
    },
    {
      icon: <Clock className='w-6 h-6' />,
      title: 'Horário',
      content: ['Retiradas: 17h às 19h', 'Vendas online: 24h', 'Alterações via stories'],
    },
    {
      icon: <Truck className='w-6 h-6' />,
      title: 'Entrega',
      content: ['Correios nacional', 'Taxa local: R$ 6,00', 'Método sacolinha'],
    },
  ];

  const paymentMethods = [
    {
      icon: <CreditCard className='w-6 h-6' />,
      title: 'PIX',
      description: 'Instantâneo e seguro',
    },
    {
      icon: <CreditCard className='w-6 h-6' />,
      title: 'Crédito',
      description: 'Parcelamento até 12x',
    },
    {
      icon: <CreditCard className='w-6 h-6' />,
      title: 'Débito',
      description: 'Pagamento à vista',
    },
    {
      icon: <Package className='w-6 h-6' />,
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
    <div className='min-h-screen mt-10 sm:mt-20 bg-white'>
      {/* Header */}
      <div className='bg-slate-900 text-white'>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
          <div className='text-center'>
            <div className='flex justify-center mb-6'>
              <ShoppingBag className='w-12 h-12 text-slate-400' strokeWidth={1.5} />
            </div>
            <h1 className='text-4xl md:text-5xl font-light mb-4 tracking-tight'>Lunar Brechó</h1>
            <p className='text-lg text-slate-400 mb-8 max-w-2xl mx-auto font-light'>
              Moda sustentável com peças únicas e acessíveis
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center mb-8'>
              <a
                href='https://wa.me/5511999999999'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-3 font-light hover:bg-slate-100 transition-colors duration-200 text-sm'
              >
                <Phone className='w-4 h-4' />
                WhatsApp
              </a>
              <a
                href='https://instagram.com/brecholunaritba'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center justify-center gap-2 border border-slate-600 text-white px-8 py-3 font-light hover:bg-slate-800 transition-colors duration-200 text-sm'
              >
                <Instagram className='w-4 h-4' />
                Instagram
              </a>
            </div>
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

      {/* Informações Básicas */}
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-light text-slate-900 mb-3 tracking-tight'>
            Informações
          </h2>
          <div className='w-12 h-px bg-slate-300 mx-auto'></div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20'>
          {infoSections.map((section, index) => (
            <div
              key={index}
              className='p-6 border border-slate-200 bg-white transition-all duration-300 hover:border-slate-300'
            >
              <div className='text-slate-400 mb-4'>{section.icon}</div>
              <h3 className='text-lg font-normal text-slate-900 mb-4'>{section.title}</h3>
              <ul className='space-y-2'>
                {section.content.map((item, itemIndex) => (
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

        {/* Formas de Pagamento */}
        <div className='mb-20'>
          <div className='text-center mb-12'>
            <h3 className='text-2xl font-light text-slate-900 mb-3 tracking-tight'>
              Formas de Pagamento
            </h3>
            <div className='w-12 h-px bg-slate-300 mx-auto'></div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className='text-center p-6 border border-slate-200 bg-slate-50 transition-all duration-300 hover:bg-white'
              >
                <div className='text-slate-400 flex justify-center mb-4'>{method.icon}</div>
                <h4 className='text-base font-normal text-slate-900 mb-2'>{method.title}</h4>
                <p className='text-slate-600 text-sm font-light'>{method.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Regrinhas */}
        <div className='mb-20'>
          <div className='text-center mb-12'>
            <h3 className='text-2xl font-light text-slate-900 mb-3 tracking-tight'>
              Políticas da Loja
            </h3>
            <div className='w-12 h-px bg-slate-300 mx-auto'></div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {rules.map((rule, index) => (
              <div
                key={index}
                className='p-6 border border-slate-200 bg-white transition-all duration-300 hover:border-slate-300'
              >
                <h4 className='text-base font-normal text-slate-900 mb-3'>{rule.title}</h4>
                <p className='text-slate-600 text-sm font-light leading-relaxed'>
                  {rule.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Como Funcionam as Vendas */}
        <div className='bg-slate-50 p-12 border border-slate-200'>
          <div className='text-center mb-8'>
            <h3 className='text-2xl font-light text-slate-900 mb-3 tracking-tight'>
              Como Funciona
            </h3>
            <div className='w-12 h-px bg-slate-300 mx-auto'></div>
          </div>

          <div className='max-w-3xl mx-auto space-y-6 text-slate-600 text-sm font-light leading-relaxed'>
            <p>
              Nosso foco principal são as vendas online, oferecendo flexibilidade total. Você pode
              comprar a qualquer hora, de qualquer lugar, com total comodidade.
            </p>
            <p>
              As vendas acontecem diariamente via stories do Instagram. Fique atento às publicações
              para não perder as novidades e peças exclusivas.
            </p>
            <p>
              Oferecemos o método "sacolinha": escolha várias peças pelos stories, realize um único
              pagamento e guardamos tudo para envio conjunto. Resultado: você economiza no frete!
            </p>
            <p>
              Entregas locais com taxa fixa de R$ 6,00 para qualquer ponto da cidade. Horários
              alternativos podem ser combinados diretamente para maior conveniência.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className='bg-slate-900 text-white py-20'>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl md:text-4xl font-light mb-4 tracking-tight'>
            Encontre seu estilo único
          </h2>
          <p className='text-base text-slate-400 mb-10 font-light'>
            Explore nossa coleção e descubra peças especiais
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <a
              href='/'
              className='bg-white text-slate-900 px-8 py-3 font-light hover:bg-slate-100 transition-colors duration-200 text-sm'
            >
              Ver Produtos
            </a>
            <a
              href='https://wa.me/5511999999999'
              target='_blank'
              rel='noopener noreferrer'
              className='border border-slate-600 text-white px-8 py-3 font-light hover:bg-slate-800 transition-colors duration-200 text-sm'
            >
              Tirar Dúvidas
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralInfo;
