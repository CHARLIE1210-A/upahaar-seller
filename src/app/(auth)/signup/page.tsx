"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Gift } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const storeName = (document.getElementById("store-name") as HTMLInputElement)
    .value;
    const email = (document.getElementById("email") as HTMLInputElement)
    .value;
    const password = (document.getElementById("password") as HTMLInputElement)
    .value;

  try {
    const payload = {
      store_name: storeName,
      email: email, 
      password: password,  
    };

    const res = await fetch("http://localhost:8081/api/auth/seller/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Signup failed");
    }

    const data = await res.json();

    // If backend sends token, store it
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    router.push("/login");
  } catch (err) {
    console.error(err);
    alert("Signup failed. Please try again.");
  }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Gift className="h-6 w-6" />
        </div>
        <CardTitle className="text-2xl font-bold">Join Upahaar</CardTitle>
        <CardDescription>
          Create your vendor account to start selling
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="store-name">Store Name</Label>
            <Input id="store-name" placeholder="My Awesome Gift Shop" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
