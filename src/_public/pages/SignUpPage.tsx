import { z } from "zod";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/lib/validation/formSchemas";
import { signUpFormValues } from "@/constants/formDefaultValues";
import { useCreateUserAccount } from "@/lib/react-query/queriesAndMutations";
import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import Loader from "@/components/shared/Loader";

const SignUpPage = () => {
  const { mutateAsync: createUserAccount, isPending: isCreating } =
    useCreateUserAccount();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: signUpFormValues,
    disabled: isCreating,
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    await createUserAccount(values);
  };

  return (
    <Form {...form}>
      <div className="sm:w-[420px] w-full p-4 flex-center flex-col">
        <h2 className="text-3xl font-bold">Sign up</h2>
        <p className="mt-2 ">
          Please enter your details to be part of this media.
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
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
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isCreating}>
            {isCreating && <Loader isButton />}
            Sign up
          </Button>

          <p className="text-center">
            Already have an account?
            <Link to="/sign-in" className="ml-1 underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignUpPage;
