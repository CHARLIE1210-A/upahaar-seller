import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Order } from '@/lib/types';

const mockOrders: Order[] = [
  { id: 'ORD001', customerName: 'Rohan Sharma', date: '2023-06-23', status: 'New', amount: 2500, items: 2, customerNotes: 'Please deliver in the evening.' },
  { id: 'ORD002', customerName: 'Priya Patel', date: '2023-06-22', status: 'Processing', amount: 1500, items: 1 },
  { id: 'ORD003', customerName: 'Amit Singh', date: '2023-06-21', status: 'Delivered', amount: 3500, items: 3 },
  { id: 'ORD004', customerName: 'Sneha Reddy', date: '2023-06-20', status: 'Cancelled', amount: 750, items: 1 },
  { id: 'ORD005', customerName: 'Vikram Kumar', date: '2023-06-23', status: 'New', amount: 500, items: 1 },
];

const getStatusVariant = (status: Order['status']) => {
  switch (status) {
    case 'New': return 'default';
    case 'Processing': return 'secondary';
    case 'Delivered': return 'outline';
    case 'Cancelled': return 'destructive';
  }
}

const OrderTable = ({ orders }: { orders: Order[] }) => (
    <Table>
        <TableHeader>
        <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead><span className="sr-only">Actions</span></TableHead>
        </TableRow>
        </TableHeader>
        <TableBody>
        {orders.map((order) => (
            <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.customerName}</TableCell>
            <TableCell>₹{order.amount.toFixed(2)}</TableCell>
            <TableCell className="hidden md:table-cell">{order.date}</TableCell>
            <TableCell>
                <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
            </TableCell>
             <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Assign Delivery</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
              </TableCell>
            </TableRow>
        ))}
        </TableBody>
    </Table>
)


export default function OrdersPage() {
  const tabs = ['All', 'New', 'Processing', 'Delivered', 'Cancelled'];

  return (
    <div className="space-y-4">
       <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
            <p className="text-muted-foreground">View and manage all customer orders.</p>
        </div>
      <Tabs defaultValue="All">
        <TabsList>
            {tabs.map(tab => (
                <TabsTrigger key={tab} value={tab}>{tab}</TabsTrigger>
            ))}
        </TabsList>
        <TabsContent value="All">
            <OrderTable orders={mockOrders} />
        </TabsContent>
        {tabs.slice(1).map(tab => (
            <TabsContent key={tab} value={tab}>
                <OrderTable orders={mockOrders.filter(o => o.status === tab)} />
            </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
