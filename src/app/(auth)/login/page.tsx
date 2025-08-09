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

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = (document.getElementById("email") as HTMLInputElement)
    .value;
    const password = (document.getElementById("password") as HTMLInputElement)
    .value;
    try {
      const payload = {
        email: email, 
        password: password,  
      };
  
      const res = await fetch("http://localhost:8081/api/auth/seller/login", {
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
  
      console.log(data)
      // If backend sends token, store it
      console.log("Token",data.token)
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
  
      router.push("/dashboard");
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
        <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
        <CardDescription>
          Log in to your Upahaar Vendor Hub account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
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
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="#"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
