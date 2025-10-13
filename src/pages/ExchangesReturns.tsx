import { RotateCcw, Clock, AlertCircle, CheckCircle, ShoppingBag } from 'lucide-react';
import Container from '../components/layout/Container';

const ExchangesReturns = () => {
  const rules = [
    {
      icon: <ShoppingBag className='w-5 h-5 text-emerald-500' />,
      title: 'Vendas Online',
      description:
        'Caso a venda tenha sido ON-LINE e você deseje trocar, damos o prazo de 48 horas (2 dias).',
    },
    {
      icon: <AlertCircle className='w-5 h-5 text-red-500' />,
      title: 'Vendas Presenciais',
      description: 'Peças que já foram finalizadas no atendimento presencial, não serão trocadas.',
    },
  ];

  const additionalInfo = [
    {
      icon: <Clock className='w-5 h-5 text-amber-500' />,
      title: 'Prazo para Troca',
      description: 'O prazo de 48 horas é contado a partir da data da compra online.',
    },
    {
      icon: <CheckCircle className='w-5 h-5 text-emerald-500' />,
      title: 'Condições da Peça',
      description:
        'A peça deve estar nas mesmas condições de quando foi adquirida, com etiquetas e sem uso.',
    },
    {
      icon: <RotateCcw className='w-5 h-5 text-violet-500' />,
      title: 'Processo de Troca',
      description:
        'Entre em contato conosco via WhatsApp ou Instagram para iniciar o processo de troca.',
    },
  ];

  return (
    <Container>
      <div className='py-6 sm:py-8'>
        {/* Header */}
        <div className='text-center mb-8 sm:mb-12'>
          <div className='flex justify-center mb-4'>
            <div className='p-3 rounded-full bg-slate-900'>
              <RotateCcw className='w-8 h-8 text-white' />
            </div>
          </div>
          <h1 className='font-bold text-2xl sm:text-3xl text-slate-800 mb-2'>
            Trocas e Devoluções
          </h1>
          <p className='text-sm sm:text-base text-slate-600 max-w-2xl mx-auto'>
            Políticas claras e transparentes
          </p>
        </div>

        {/* Regras Principais */}
        <div className='mb-8 sm:mb-12'>
          <h2 className='font-bold text-lg sm:text-xl text-slate-800 mb-4'>Políticas</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
            {rules.map((rule, index) => (
              <div
                key={index}
                className='p-4 sm:p-6 border border-slate-200 bg-white rounded-lg transition-all duration-300 hover:shadow-lg hover:border-slate-300'
              >
                <div className='flex items-start gap-3'>
                  <div className='flex-shrink-0'>{rule.icon}</div>
                  <div>
                    <h3 className='font-medium text-sm sm:text-base text-slate-800 mb-2'>
                      {rule.title}
                    </h3>
                    <p className='text-slate-600 text-sm leading-relaxed'>{rule.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className='mb-8 sm:mb-12'>
          <h2 className='font-bold text-lg sm:text-xl text-slate-800 mb-4'>
            Informações Importantes
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6'>
            {additionalInfo.map((info, index) => (
              <div
                key={index}
                className='text-center p-4 border border-slate-200 bg-white rounded-lg'
              >
                <div className='flex justify-center mb-3'>{info.icon}</div>
                <h4 className='font-medium text-sm sm:text-base text-slate-800 mb-2'>
                  {info.title}
                </h4>
                <p className='text-slate-600 text-sm leading-relaxed'>{info.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className='bg-slate-900 text-white p-6 sm:p-8 rounded-lg'>
          <div className='text-center'>
            <h2 className='font-bold text-lg sm:text-xl mb-3'>Precisa de ajuda?</h2>
            <p className='text-sm sm:text-base text-slate-300 mb-6'>
              Entre em contato para esclarecer dúvidas
            </p>
            <div className='flex flex-col sm:flex-row gap-3 justify-center'>
              <a
                href='https://wa.me/5534996962488'
                target='_blank'
                rel='noopener noreferrer'
                className='bg-emerald-500 text-white px-6 py-2 text-sm font-medium hover:bg-emerald-600 transition-colors rounded-lg'
              >
                WhatsApp
              </a>
              <a
                href='https://instagram.com/brecholunaritba'
                target='_blank'
                rel='noopener noreferrer'
                className='border border-purple-500 text-white px-6 py-2 text-sm font-medium hover:bg-purple-500/10 transition-colors rounded-lg'
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ExchangesReturns;
