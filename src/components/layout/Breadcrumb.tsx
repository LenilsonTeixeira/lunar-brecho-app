import { ChevronRight } from "lucide-react";
import { Link } from "react-router";

type BreadcrumbItem = {
    label: string;
    to?: string;
  };
  
  type BreadcrumbProps = {
    items: BreadcrumbItem[];
  };

const Breadcrumb = ({ items }: BreadcrumbProps) => {
    return (
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
    
              return (
                <li key={index} className="inline-flex items-center">
                  {index > 0 && (
                    <ChevronRight />
                  )}
    
                  {isLast ? (
                    <span className="text-sm font-medium text-slate-800">{item.label}</span>
                  ) : (
                    <Link
                      to={item.to || "#"}
                      className="text-sm font-light text-slate-800 hover:text-blue-600"
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
    }

export default Breadcrumb