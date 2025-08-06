'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  ListOrdered,
  Package,
  Truck,
  Banknote,
  Bell,
  User,
  LifeBuoy,
  Gift,
} from 'lucide-react';

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';


const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dashboard/orders', label: 'Orders', icon: ListOrdered },
  { href: '/dashboard/products', label: 'Products', icon: Package },
  { href: '/dashboard/delivery', label: 'Pickup & Delivery', icon: Truck },
  { href: '/dashboard/payments', label: 'Payments', icon: Banknote },
  { href: '/dashboard/notifications', label: 'Notifications', icon: Bell },
];

const helpItems = [
    { href: '/dashboard/settings', label: 'Settings', icon: User },
    { href: '/dashboard/support', label: 'Support', icon: LifeBuoy },
]

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Gift className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold text-primary">Upahaar Vendor Hub</span>
        </Link>
      </SidebarHeader>

      <div className="flex-1 overflow-y-auto">
        <SidebarMenu>
            <SidebarGroup>
                <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
                {navItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                        tooltip={item.label}
                    >
                        <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarGroup>
            <Separator className="my-2" />
             <SidebarGroup>
                <SidebarGroupLabel>Account & Help</SidebarGroupLabel>
                {helpItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                        tooltip={item.label}
                    >
                        <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarGroup>
        </SidebarMenu>
      </div>

      <SidebarFooter>
         <Card className="m-2">
            <CardHeader>
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                Unlock all features and get unlimited access to our support team.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button size="sm" className="w-full">
                Upgrade
                </Button>
            </CardContent>
        </Card>
      </SidebarFooter>
    </div>
  );
}
