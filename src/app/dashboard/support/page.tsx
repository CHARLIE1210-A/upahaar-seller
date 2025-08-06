import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LifeBuoy, MessageSquare } from 'lucide-react';

const faqs = [
    {
        question: "How do I add a new product?",
        answer: "Navigate to the 'Products' page from the sidebar and click the 'Add Product' button. Fill in the details and save."
    },
    {
        question: "How do payouts work?",
        answer: "Payouts are processed automatically every 15 days to your linked bank account or UPI ID. You can track them in the 'Payments' section."
    },
    {
        question: "Can I set my store to 'closed' temporarily?",
        answer: "Yes, in the 'Settings' page, you can find a toggle to open or close your store for new orders."
    },
    {
        question: "What are the packaging guidelines?",
        answer: "Please ensure all items are securely packaged to prevent damage during transit. Use appropriate branding materials if available."
    }
]

export default function SupportPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Support & Help</h1>
                <p className="text-muted-foreground">Get help with your store or contact our support team.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                 <Card>
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                        <MessageSquare className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>Live Chat</CardTitle>
                            <CardDescription>Get instant help from our team.</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Button className="w-full">Start Chat</Button>
                        <p className="mt-2 text-center text-xs text-muted-foreground">Available from 9 AM to 9 PM IST</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                        <LifeBuoy className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>Raise a Ticket</CardTitle>
                            <CardDescription>For non-urgent issues, raise a ticket.</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                         <Button className="w-full" variant="outline">Create a Support Ticket</Button>
                         <p className="mt-2 text-center text-xs text-muted-foreground">We typically reply within 24 hours</p>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                             <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent>{faq.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    )
}
