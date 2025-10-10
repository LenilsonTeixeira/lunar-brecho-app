import { RotateCcw, Clock, AlertCircle, CheckCircle, ShoppingBag, ArrowLeft } from 'lucide-react';

const ExchangesReturns = () => {
  const rules = [
    {
      icon: <ShoppingBag className='w-6 h-6' />,
      title: 'Vendas Online',
      description:
        'Caso a venda tenha sido ON-LINE e você deseje trocar, damos o prazo de 48 horas (2 dias).',
      highlight: true,
    },
    {
      icon: <AlertCircle className='w-6 h-6' />,
      title: 'Vendas Presenciais',
      description: 'Peças que já foram finalizadas no atendimento presencial, não serão trocadas.',
      warning: true,
    },
  ];

  const additionalInfo = [
    {
      icon: <Clock className='w-6 h-6' />,
      title: 'Prazo para Troca',
      description: 'O prazo de 48 horas é contado a partir da data da compra online.',
    },
    {
      icon: <CheckCircle className='w-6 h-6' />,
      title: 'Condições da Peça',
      description:
        'A peça deve estar nas mesmas condições de quando foi adquirida, com etiquetas e sem uso.',
    },
    {
      icon: <RotateCcw className='w-6 h-6' />,
      title: 'Processo de Troca',
      description:
        'Entre em contato conosco via WhatsApp ou Instagram para iniciar o processo de troca.',
    },
  ];

  return (
    <div className='min-h-screen mt-10 sm:mt-20 bg-white'>
      {/* Header */}
      <div className='bg-slate-900 text-white'>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
          <div className='text-center'>
            <div className='flex justify-center mb-6'>
              <RotateCcw className='w-12 h-12 text-slate-400' strokeWidth={1.5} />
            </div>
            <h1 className='text-4xl md:text-5xl font-light mb-4 tracking-tight'>
              Trocas e Devoluções
            </h1>
            <p className='text-lg text-slate-400 mb-8 max-w-2xl mx-auto font-light'>
              Políticas claras e transparentes
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

      {/* Regras Principais */}
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-light text-slate-900 mb-3 tracking-tight'>
            Políticas
          </h2>
          <div className='w-12 h-px bg-slate-300 mx-auto'></div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-20'>
          {rules.map((rule, index) => (
            <div
              key={index}
              className={`p-8 transition-all duration-300 border ${
                rule.highlight
                  ? 'bg-slate-50 border-slate-200'
                  : rule.warning
                    ? 'bg-white border-slate-200'
                    : 'bg-white border-slate-100'
              }`}
            >
              <div className='flex items-start gap-4'>
                <div className='text-slate-400 flex-shrink-0'>{rule.icon}</div>
                <div>
                  <h3 className='text-lg font-normal text-slate-900 mb-3'>{rule.title}</h3>
                  <p className='text-slate-600 leading-relaxed text-sm font-light'>
                    {rule.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Informações Adicionais */}
        <div className='bg-slate-50 p-12 border border-slate-200'>
          <h3 className='text-2xl font-light text-slate-900 mb-12 text-center tracking-tight'>
            Informações Importantes
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
            {additionalInfo.map((info, index) => (
              <div key={index} className='text-center'>
                <div className='text-slate-400 flex justify-center mb-4'>{info.icon}</div>
                <h4 className='text-base font-normal text-slate-900 mb-3'>{info.title}</h4>
                <p className='text-slate-600 leading-relaxed text-sm font-light'>
                  {info.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className='bg-slate-900 text-white py-20'>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl md:text-4xl font-light mb-4 tracking-tight'>Precisa de ajuda?</h2>
          <p className='text-base text-slate-400 mb-10 font-light'>
            Entre em contato para esclarecer dúvidas
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <a
              href='https://wa.me/5511999999999'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-white text-slate-900 px-8 py-3 font-light hover:bg-slate-100 transition-colors duration-200 text-sm'
            >
              WhatsApp
            </a>
            <a
              href='https://instagram.com/brecholunaritba'
              target='_blank'
              rel='noopener noreferrer'
              className='border border-slate-600 text-white px-8 py-3 font-light hover:bg-slate-800 transition-colors duration-200 text-sm'
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangesReturns;
