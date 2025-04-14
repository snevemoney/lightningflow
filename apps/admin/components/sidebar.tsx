import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Wallet,
  Users,
  Zap,
  Bot,
  BarChart,
  Settings,
  Network,
  Shield
} from 'lucide-react';

const navigation = [
  {
    name: 'Node Health',
    href: '/node',
    icon: Network,
    description: 'Lightning node status, channels, and liquidity'
  },
  {
    name: 'Clients',
    href: '/clients',
    icon: Users,
    description: 'Manage barbers, creators, and their wallets'
  },
  {
    name: 'Wallets',
    href: '/wallets',
    icon: Wallet,
    description: 'View and manage all Lightning wallets'
  },
  {
    name: 'AI Agents',
    href: '/agents',
    icon: Bot,
    description: 'Configure and monitor RAG-enabled agents'
  },
  {
    name: 'Lightning',
    href: '/lightning',
    icon: Zap,
    description: 'Lightning Network operations and routing'
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: BarChart,
    description: 'Platform metrics and reporting'
  },
  {
    name: 'Security',
    href: '/security',
    icon: Shield,
    description: 'Access control and permissions'
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'Platform configuration'
  }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-lg font-semibold">Lightning Admin</h1>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center rounded-md px-3 py-2 text-sm font-medium',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent'
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5',
                  isActive ? 'text-primary-foreground' : 'text-muted-foreground'
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
} 