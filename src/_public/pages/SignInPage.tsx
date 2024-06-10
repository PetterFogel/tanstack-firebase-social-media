import { z } from "zod";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/lib/validation/formSchemas";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import Loader from "@/components/shared/Loader";

const SignInPage = () => {
  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccount();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    disabled: isSigningIn,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    await signInAccount(values);
  };

  return (
    <Form {...form}>
      <div className="sm:w-[420px] w-full p-4 flex-center flex-col">
        <h2 className="text-3xl font-bold">Sign In</h2>
        <p className="mt-2 ">Please enter your details to sign in.</p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
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
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSigningIn}>
            {isSigningIn && <Loader isButton />}
            Sign in
          </Button>
          <p className="text-center">
            Don't have an account?
            <Link to="/sign-up" className="ml-1 underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignInPage;
