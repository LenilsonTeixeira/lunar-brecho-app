import FooterMenu from './FooterMenu';
import FooterSocial from './FooterSocial';

type FooterLink = {
  label: string;
  href: string;
};

type FooterProps = {
  year?: number;
  links?: FooterLink[];
  instagramHandle?: string;
};

const defaultLinks: FooterLink[] = [
  { label: 'Trocas ou Devoluções', href: '#' },
  { label: 'Entregas', href: '#' },
  { label: 'Loja Física', href: '#' },
  { label: 'Política de Reserva', href: '#' },
  { label: 'Contato', href: '#' },
];

const Footer = ({
  year = new Date().getFullYear(),
  links = defaultLinks,
  instagramHandle = 'brecholunaritba',
}: FooterProps) => {
  return (
    <footer className='bg-slate-900 text-slate-50 w-full py-6 px-4 mt-20'>
      <div className='max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6'>
        <p className='text-sm text-slate-200 text-center sm:text-left'>
          &copy; {year} Todos os direitos reservados.
        </p>

        <FooterMenu links={links} />

        {instagramHandle && <FooterSocial instagramHandle={instagramHandle} />}
      </div>
    </footer>
  );
};

export default Footer;
