/** Icon set (plan G-30 to G-37, G-46): 24px grid, 1.75px stroke, rounded caps, currentColor. */
import type { SVGProps } from 'react';

const paths: Record<string, React.ReactNode> = {
  truck: (<><path d="M3 7h11v9H3z" /><path d="M14 10h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /><path d="M5 7c0-1.8 1.4-3 3.3-3h1.4C11.6 4 13 5.2 13 7" /></>),
  exchange: (<><path d="M6 13c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" /><path d="M4 13h16" /><path d="M17 4l2.5 2.5L17 9" /><path d="M7 20l-2.5-2.5L7 15" /><path d="M19.5 6.5H15M4.5 17.5H9" /></>),
  calendar: (<><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 9.5h17M8 3v4M16 3v4" /><path d="M10 16.5a2.5 2.5 0 1 0 0-3.5" /><path d="M9 11.8v1.7h1.7" /></>),
  ponytail: (<><path d="M4 14c0-4 3-7 8-7s8 3 8 7" /><path d="M3 14h18" /><path d="M12 7c2 1 3.5 3 3.5 5" /><path d="M16 14c1.5 1.5 2 3.5 1.2 6" /><path d="M18.5 14c1.2 1.3 1.6 3 1 4.7" /></>),
  smallfit: (<><path d="M5 13c0-3.6 3-6 7-6s7 2.4 7 6" /><path d="M3.5 13h17" /><path d="M5 17.5h14" strokeDasharray="1.6 2.2" /><path d="M5 16v3M19 16v3" /></>),
  sun: (<><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" /></>),
  drop: (<><path d="M12 3.5s-6 6.6-6 10.5a6 6 0 0 0 12 0c0-3.9-6-10.5-6-10.5z" /><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" /></>),
  makeup: (<><path d="M9 21h6M10 21v-6h4v6" /><path d="M10 15l.8-8.5 3.2-2.5V15" /><path d="M5 10l2 1M4.5 14h2" /></>),
  needle: (<><path d="M19.5 4.5L8 16" /><path d="M17.5 4.5a1.4 1.4 0 0 1 2 2" /><path d="M8 16l-2.5 3.5L9 17" /><path d="M3 12c2-1.5 4 1.5 6 0s4 1.5 6 0" strokeDasharray="2 1.6" /></>),
  print: (<><rect x="4" y="5" width="16" height="12" rx="2" /><path d="M8 13l2.5-3 2 2.2L14 10.5l2 2.5" /><circle cx="9" cy="8.5" r="1" /><path d="M7 20h10" /></>),
  rope: (<><path d="M3 15c3-2 6-2 9 0s6 2 9 0" /><path d="M5 13.7l1.2 2.6M9 13.2l1.1 2.7M13 13.6l1.1 2.7M17 14l1.1 2.6" /></>),
  mesh: (<><path d="M4 6h16v12H4z" /><path d="M8 6v12M12 6v12M16 6v12M4 10h16M4 14h16" /></>),
  leaf: (<><path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14z" /><path d="M5 19l8-8" /></>),
  snow: (<><path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9" /><path d="M10 4.5l2 1.8 2-1.8M10 19.5l2-1.8 2 1.8" /></>),
  tape: (<><circle cx="10" cy="11" r="6.5" /><circle cx="10" cy="11" r="2" /><path d="M16.5 11V17.5H21" /><path d="M18 15.5v2M20 15.5v2" /></>),
  search: (<><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></>),
  user: (<><circle cx="12" cy="8.5" r="4" /><path d="M4.5 20c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5" /></>),
  bag: (<><path d="M5 8h14l-1.2 12H6.2z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></>),
  menu: (<><path d="M4 8h16M4 16h16" /></>),
  close: (<><path d="M6 6l12 12M18 6L6 18" /></>),
  plus: (<><path d="M12 5v14M5 12h14" /></>),
  minus: (<><path d="M5 12h14" /></>),
  arrow: (<><path d="M5 12h14M13 6l6 6-6 6" /></>),
  check: (<><path d="M5 12.5l4.5 4.5L19 7.5" /></>),
  lock: (<><rect x="5" y="10.5" width="14" height="10" rx="2" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" /></>),
  gift: (<><rect x="4" y="9" width="16" height="11" rx="1.5" /><path d="M3 9h18v-2.5H3zM12 6.5V20" /><path d="M12 6.5C10 6.5 8 5.8 8 4.4S10.5 3 12 6.5zM12 6.5c2 0 4-.7 4-2.1S13.5 3 12 6.5z" /></>),
  chevron: (<><path d="M9 6l6 6-6 6" /></>),
  star: (<><path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z" /></>),
};

export type IconKey = keyof typeof paths;

export function Icon({ name, ...rest }: { name: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...rest}>
      {paths[name] ?? paths.check}
    </svg>
  );
}
