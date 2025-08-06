import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, Banknote, Landmark } from 'lucide-react';
import type { Payment } from '@/lib/types';


const mockPayments: Payment[] = [
    { transactionId: 'TRN001', date: '2023-06-20', amount: 50000, status: 'Completed', type: 'Withdrawal' },
    { transactionId: 'TRN002', date: '2023-06-15', amount: 12000, status: 'Completed', type: 'Earning' },
    { transactionId: 'TRN003', date: '2023-06-10', amount: 25000, status: 'Completed', type: 'Withdrawal' },
    { transactionId: 'TRN004', date: '2023-06-05', amount: 8000, status: 'Pending', type: 'Earning' },
];

const getStatusVariant = (status: Payment['status']) => {
    switch(status) {
        case 'Completed': return 'outline';
        case 'Pending': return 'secondary';
        case 'Failed': return 'destructive';
    }
}

export default function PaymentsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Payments & Earnings</h1>
                <p className="text-muted-foreground">Track your earnings and manage your withdrawals.</p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                        <Banknote className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹8,50,432.00</div>
                        <p className="text-xs text-muted-foreground">All-time earnings</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Payout</CardTitle>
                        <Landmark className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹12,345.50</div>
                        <p className="text-xs text-muted-foreground">Next payout on July 1st</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Last Withdrawal</CardTitle>
                        <Banknote className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹50,000.00</div>
                        <p className="text-xs text-muted-foreground">On June 20th</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-5">
                <div className="md:col-span-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Transaction History</CardTitle>
                            <CardDescription>View your recent earnings and withdrawals.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Transaction ID</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Invoice</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockPayments.map(p => (
                                        <TableRow key={p.transactionId}>
                                            <TableCell className="font-mono text-xs">{p.transactionId}</TableCell>
                                            <TableCell>{p.date}</TableCell>
                                            <TableCell>{p.type}</TableCell>
                                            <TableCell>₹{p.amount.toFixed(2)}</TableCell>
                                            <TableCell><Badge variant={getStatusVariant(p.status)}>{p.status}</Badge></TableCell>
                                            <TableCell>
                                                <Button variant="outline" size="icon">
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Payout Settings</CardTitle>
                            <CardDescription>Setup your UPI or bank account for payouts.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="space-y-2">
                                <Label htmlFor="upi">UPI ID</Label>
                                <Input id="upi" placeholder="yourname@upi" defaultValue="giftshop@okhdfc" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="account-holder">Account Holder Name</Label>
                                <Input id="account-holder" placeholder="e.g. The Gift Shop" defaultValue="The Gift Shop Pvt Ltd" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="account-number">Bank Account Number</Label>
                                <Input id="account-number" placeholder="Your account number" defaultValue="**** **** **** 1234" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="ifsc">IFSC Code</Label>
                                <Input id="ifsc" placeholder="Your bank's IFSC code" defaultValue="HDFC0001234" />
                            </div>
                            <Button className="w-full">Save Changes</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

        </div>
    )
}
