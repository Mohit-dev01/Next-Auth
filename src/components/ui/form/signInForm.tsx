"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../button";
import { Input } from "../input";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().min(1, "Email is required").email("invalid email"),
  password: z
    .string()
    .min(1, "password is required")
    .min(8, "password must have 8 characters"),
});

const SignInForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter()

  const onSubmit =async (data: z.infer<typeof formSchema>) => {
   const signInData = await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: false
   }) 
    if(signInData?.error){
      console.log("Sign-In-eror",signInData.error)
    }
    else{
      router.push("/")
    }
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full mt-4" type="submit">
            Sign In
          </Button>
        </form>
        <div className="mt-4">
          If you donot have an account , please
          <Link className="text-blue-500 hover:underline" href="/sign-up">
            {" "}
            Sign Up
          </Link>
        </div>
      </Form>
    </>
  );
};

export default SignInForm;
