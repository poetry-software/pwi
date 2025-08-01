import { cn } from '@/lib/utils';
import { BarChart3, MessageSquare, MessagesSquare, Settings } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface NavigationProps {
  activeItem?: 'tickets' | 'conversations' | 'reports' | 'admin';
}

export function Navigation({ activeItem = 'tickets' }: NavigationProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [lineStyle, setLineStyle] = useState({ left: '0px', width: '0px' });
  const navRef = useRef<HTMLDivElement>(null);

  const updateLinePosition = (itemId: string) => {
    if (!navRef.current) return;

    const targetButton = navRef.current.querySelector(`[data-nav-id="${itemId}"]`) as HTMLElement;
    if (targetButton) {
      const rect = targetButton.getBoundingClientRect();
      const navRect = navRef.current.getBoundingClientRect();
      const left = rect.left - navRect.left;
      const width = rect.width;

      setLineStyle({
        left: `${left}px`,
        width: `${width}px`,
      });
    }
  };

  useEffect(() => {
    updateLinePosition(hoveredItem || activeItem);
  }, [hoveredItem, activeItem]);

  const menuItems = [
    {
      id: 'tickets',
      label: 'Tickets',
      icon: MessageSquare,
      active: activeItem === 'tickets',
    },
    {
      id: 'conversations',
      label: 'Conversations',
      icon: MessagesSquare,
      active: activeItem === 'conversations',
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: BarChart3,
      active: activeItem === 'reports',
    },
    {
      id: 'admin',
      label: 'Admin',
      icon: Settings,
      active: activeItem === 'admin',
    },
  ];

  return (
    <nav className="rounded-t-md bg-gray-800 shadow-sm">
      <div ref={navRef} className="relative flex">
        {menuItems.map((item, index) => (
          <button
            key={item.id}
            data-nav-id={item.id}
            className={cn(
              'group relative flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors',
              item.active ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white',
              index === 0 && 'rounded-l-md',
            )}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <item.icon className={cn('h-5 w-5 transition-colors', item.active ? 'text-white' : 'text-gray-400 group-hover:text-white')} />
            <span>{item.label}</span>
          </button>
        ))}

        {/* Single animated line that moves between active and hovered items */}
        <div className="absolute bottom-0 h-1 rounded-t-md bg-primary transition-all duration-250 ease-in-out" style={lineStyle} />
      </div>
    </nav>
  );
}
