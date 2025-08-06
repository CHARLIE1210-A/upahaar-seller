import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Upload } from 'lucide-react';
import Image from 'next/image';

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your store profile and settings.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Store Profile</CardTitle>
                    <CardDescription>Update your store's public information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                         <Image src="https://placehold.co/80x80.png" alt="Store Logo" width={80} height={80} className="rounded-full" data-ai-hint="logo gift" />
                         <div className="grid gap-1">
                            <Label>Store Logo</Label>
                             <Input type="file" className="w-full max-w-xs" />
                             <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 5MB.</p>
                         </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="store-name">Store Name</Label>
                            <Input id="store-name" defaultValue="The Gift Shop" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="store-contact">Contact Phone</Label>
                            <Input id="store-contact" defaultValue="+91 98765 43210" />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="store-address">Store Address</Label>
                        <Input id="store-address" defaultValue="123, Gift Lane, Floral City, India - 110001" />
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                        <Switch id="store-status" defaultChecked />
                        <Label htmlFor="store-status">Store is open for orders</Label>
                    </div>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Business Documents</CardTitle>
                    <CardDescription>Upload your business documents for verification.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="grid gap-4 md:grid-cols-2">
                         <div className="space-y-2">
                             <Label htmlFor="gst-doc">GST Certificate</Label>
                             <div className="flex items-center gap-2">
                                <Input id="gst-doc" type="file" />
                                <Button variant="outline" size="icon"><Upload className="h-4 w-4" /></Button>
                             </div>
                             <p className="text-xs text-muted-foreground">Status: <span className="font-medium text-green-600">Verified</span></p>
                         </div>
                         <div className="space-y-2">
                             <Label htmlFor="pan-doc">PAN Card</Label>
                             <div className="flex items-center gap-2">
                                <Input id="pan-doc" type="file" />
                                <Button variant="outline" size="icon"><Upload className="h-4 w-4" /></Button>
                             </div>
                              <p className="text-xs text-muted-foreground">Status: <span className="font-medium text-green-600">Verified</span></p>
                         </div>
                     </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button>Save All Settings</Button>
            </div>
        </div>
    )
}
