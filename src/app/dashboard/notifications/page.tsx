import { Bell, Package, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const notifications = [
    {
        icon: <Package className="h-5 w-5 text-primary" />,
        title: "New Order #ORD006",
        time: "5 minutes ago",
        description: "You have a new order from Anjali Mehta for a value of ₹1250.",
        read: false
    },
    {
        icon: <CheckCircle2 className="h-5 w-5" style={{ color: 'hsl(var(--chart-3))' }} />,
        title: "Payout Processed",
        time: "2 days ago",
        description: "Your payout of ₹50,000 has been successfully processed.",
        read: true
    },
    {
        icon: <Bell className="h-5 w-5" style={{ color: 'hsl(var(--chart-4))' }} />,
        title: "Platform Announcement",
        time: "4 days ago",
        description: "Scheduled maintenance on Sunday, June 25th from 2 AM to 4 AM.",
        read: true
    }
]

export default function NotificationsPage() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
                    <p className="text-muted-foreground">Stay updated with your store and platform announcements.</p>
                </div>
                <Button variant="outline">Mark all as read</Button>
            </div>
            <Card>
                <CardContent className="p-0">
                    <div className="divide-y divide-border">
                        {notifications.map((notification, index) => (
                            <div key={index} className={`flex items-start gap-4 p-4 ${!notification.read ? 'bg-primary/5' : ''}`}>
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                                    {notification.icon}
                                </div>
                                <div className="grid flex-1 gap-1">
                                    <p className="text-sm font-medium">{notification.title}</p>
                                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                                </div>
                                {!notification.read && <div className="mt-2 h-2 w-2 rounded-full bg-primary"></div>}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
