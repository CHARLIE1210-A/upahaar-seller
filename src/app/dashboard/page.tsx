import {
  DollarSign,
  Users,
  Package,
  ListOrdered,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { PerformanceChart } from '@/components/performance-chart';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const cardData = [
  {
    title: 'Total Revenue',
    amount: '₹4,52,318.89',
    change: '+20.1% from last month',
    icon: DollarSign,
  },
  {
    title: 'Total Orders',
    amount: '+2350',
    change: '+180.1% from last month',
    icon: ListOrdered,
  },
  {
    title: 'Top Product',
    amount: 'Rose Bouquet',
    change: '520 units sold',
    icon: Package,
  },
  {
    title: 'Active Customers',
    amount: '+573',
    change: '+21 since last hour',
    icon: Users,
  },
];

const recentOrders = [
    {
        name: "Olivia Martin",
        email: "olivia.martin@email.com",
        amount: "₹1,999.00",
    },
    {
        name: "Jackson Lee",
        email: "jackson.lee@email.com",
        amount: "₹390.00",
    },
    {
        name: "Isabella Nguyen",
        email: "isabella.nguyen@email.com",
        amount: "₹2,990.00",
    },
    {
        name: "William Kim",
        email: "will@email.com",
        amount: "₹990.00",
    },
    {
        name: "Sofia Davis",
        email: "sofia.davis@email.com",
        amount: "₹390.00",
    },
]


export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4">
       <div className="flex items-center justify-between space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back, The Gift Shop!
            </h1>
          </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cardData.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.amount}</div>
              <p className="text-xs text-muted-foreground">{card.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
            <CardDescription>Your sales performance over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <PerformanceChart />
          </CardContent>
        </Card>
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>
              You made 265 sales this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
          <div className="space-y-8">
            {recentOrders.map(order => (
                <div key={order.email} className="flex items-center">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={`https://placehold.co/36x36.png`} alt="Avatar" data-ai-hint="person" />
                        <AvatarFallback>{order.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{order.name}</p>
                        <p className="text-sm text-muted-foreground">{order.email}</p>
                    </div>
                    <div className="ml-auto font-medium">{order.amount}</div>
                </div>
            ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
