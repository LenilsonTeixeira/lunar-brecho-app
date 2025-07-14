import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

type BreadcrumbItem = {
  label: string;
  to?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className='flex overflow-x-auto scrollbar-hide' aria-label='Breadcrumb'>
      <ol className='inline-flex items-center space-x-1 md:space-x-2 lg:space-x-3 rtl:space-x-reverse min-w-max'>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className='inline-flex items-center flex-shrink-0'>
              {index > 0 && (
                <ChevronRight size={14} className='mx-0.5 md:mx-1 text-slate-400 flex-shrink-0' />
              )}

              {isLast ? (
                <span className='text-xs md:text-sm font-semibold text-slate-900 px-1.5 md:px-2 py-1 rounded-md bg-slate-50 border border-slate-200 whitespace-nowrap'>
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to || '#'}
                  className='text-xs md:text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-1.5 md:px-2 py-1 rounded-md transition-all duration-200 whitespace-nowrap'
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
