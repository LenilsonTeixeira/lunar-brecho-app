import { Link } from 'react-router';

type FooterLink = {
  label: string;
  href: string;
};

type FooterMenuProps = {
  links: FooterLink[];
};

const FooterMenu = ({ links }: FooterMenuProps) => {
  return (
    <nav className='flex flex-wrap justify-center gap-4 text-sm font-medium'>
      {links.map((link) => (
        <Link key={link.label} to={link.href} className='hover:text-sky-400 transition-colors'>
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default FooterMenu;
