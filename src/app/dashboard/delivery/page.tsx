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
import { FileText } from 'lucide-react';
import type { Delivery } from '@/lib/types';

const mockDeliveries: Delivery[] = [
    { orderId: 'ORD001', status: 'Pending Pickup', trackingId: 'UPAH12345', deliveryPerson: 'Ramesh Kumar', lastUpdate: '2023-06-23 10:00 AM' },
    { orderId: 'ORD002', status: 'In Transit', trackingId: 'UPAH12346', deliveryPerson: 'Suresh Singh', lastUpdate: '2023-06-23 11:30 AM' },
    { orderId: 'ORD003', status: 'Delivered', trackingId: 'UPAH12347', deliveryPerson: 'Ramesh Kumar', lastUpdate: '2023-06-22 02:00 PM' },
    { orderId: 'ORD005', status: 'Pending Pickup', trackingId: 'UPAH12348', deliveryPerson: 'Unassigned', lastUpdate: '2023-06-23 09:00 AM' },
];

const getStatusVariant = (status: Delivery['status']) => {
  switch (status) {
    case 'Pending Pickup': return 'secondary';
    case 'In Transit': return 'default';
    case 'Delivered': return 'outline';
    case 'Failed': return 'destructive';
  }
}

export default function DeliveryPage() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Pickup & Delivery</h1>
                    <p className="text-muted-foreground">Manage your delivery requests and track order status.</p>
                </div>
                <Button>Request New Pickup</Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Tracking ID</TableHead>
                        <TableHead>Delivery Person</TableHead>
                        <TableHead>Last Update</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockDeliveries.map(delivery => (
                        <TableRow key={delivery.orderId}>
                            <TableCell className="font-medium">{delivery.orderId}</TableCell>
                            <TableCell><Badge variant={getStatusVariant(delivery.status)}>{delivery.status}</Badge></TableCell>
                            <TableCell>{delivery.trackingId}</TableCell>
                            <TableCell>{delivery.deliveryPerson}</TableCell>
                            <TableCell>{delivery.lastUpdate}</TableCell>
                            <TableCell>
                                <Button variant="outline" size="sm">
                                    <FileText className="mr-2 h-4 w-4" /> Print Label
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
