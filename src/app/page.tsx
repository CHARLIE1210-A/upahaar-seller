import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Gift, Package, Rocket, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

const featureCards = [
  {
    icon: <Package className="h-10 w-10 text-primary" />,
    title: 'Effortless Product Management',
    description: 'Easily add, update, and manage your gift products with our intuitive interface. Keep track of inventory and sales performance.',
  },
  {
    icon: <Rocket className="h-10 w-10 text-primary" />,
    title: 'Seamless Order Fulfillment',
    description: 'From new orders to delivery, our platform simplifies the entire process, allowing you to focus on creating amazing gifts.',
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: 'Secure & Timely Payments',
    description: 'Get your earnings securely and on time. Track your payments and manage your finances with complete transparency.',
  },
];


export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Gift className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold text-primary">
              Upahaar Vendor Hub
            </span>
          </Link>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
                <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <Image
                    src="https://placehold.co/600x400.png"
                    width="600"
                    height="400"
                    alt="Hero"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                    data-ai-hint="gift shop interior"
                  />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Join the Premier Network for Gift Vendors
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Upahaar provides the tools and platform you need to grow your gift business. Reach more customers, manage orders effortlessly, and watch your sales soar.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/signup">
                      Get Started
                    </Link>
                  </Button>
                   <Button size="lg" variant="outline" asChild>
                    <Link href="/dashboard">
                      Login to Dashboard
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-muted py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need to Succeed</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Our platform is packed with features designed to help you run your business smoothly and efficiently.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 pt-12">
                    {featureCards.map((feature, index) => (
                         <Card key={index} className="text-center">
                            <CardContent className="flex flex-col items-center gap-4 p-6">
                                {feature.icon}
                                <h3 className="text-xl font-bold">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                <div className="space-y-3">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                        Ready to Grow Your Gift Business?
                    </h2>
                    <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Sign up today and join a thriving community of vendors. It only takes a few minutes to get started.
                    </p>
                </div>
                <div className="mx-auto w-full max-w-sm space-y-2">
                    <Button type="submit" size="lg" asChild className="w-full">
                         <Link href="/signup">
                            Create Your Vendor Account
                        </Link>
                    </Button>
                    <p className="text-xs text-muted-foreground">
                        Start selling in minutes. It's free to join.
                    </p>
                </div>
            </div>
        </section>

      </main>

      <footer className="flex w-full shrink-0 flex-col items-center justify-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-muted-foreground">&copy; 2024 Upahaar. All rights reserved.</p>
      </footer>
    </div>
  );
}
