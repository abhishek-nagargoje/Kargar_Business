import { memo } from 'react';
import { Link } from 'react-router';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  /** 'dark' for use on navy hero backgrounds — keeps links and hover states above 4.5:1 contrast. */
  tone?: 'light' | 'dark';
}

const TONES = {
  light: { nav: 'text-gray-600', link: 'hover:text-navy-900', separator: 'text-gray-400', current: 'text-navy-900' },
  dark: { nav: 'text-gray-300', link: 'hover:text-white', separator: 'text-gray-400', current: 'text-white' },
} as const;

export const Breadcrumb = memo(function Breadcrumb({ items, className, tone = 'light' }: BreadcrumbProps) {
  const colors = TONES[tone];
  return (
    <nav aria-label="Breadcrumb" className={`text-sm py-4 overflow-x-auto whitespace-nowrap ${colors.nav} ${className ?? ''}`}>
      <ol role="list" className="flex items-center list-none p-0 m-0">
        <li className="flex items-center">
          <Link to="/" className={`${colors.link} transition-colors flex items-center gap-1 focus-ring rounded-sm`}>
            <Home className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center">
              <ChevronRight className={`h-4 w-4 mx-2 flex-shrink-0 ${colors.separator}`} aria-hidden="true" />
              {isLast || !item.href ? (
                <span className={`${colors.current} font-medium`} aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link to={item.href} className={`${colors.link} transition-colors focus-ring rounded-sm`}>
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});
