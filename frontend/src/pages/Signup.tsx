import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useMutation } from "react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type SignupForm = z.infer<typeof schema>;

export default function Signup() {
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (data: SignupForm) =>
      axios.post("http://localhost:4000/api/register", data),
    onSuccess: (res) => {
      setSuccessMsg(res.data.message);
    },
  });

  const onSubmit = (data: SignupForm) => {
    mutation.mutate(data);
  };

  return (
    <>
    <Helmet>
      <title>Signup | MyApp</title>
      <meta name="description" content="Create a new account and get started." />
    </Helmet>

    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Create an Account</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            {...register("email")}
            placeholder="UID"
            className="block appearance-none w-full text-gray-500 bg-white border border-gray-400/20 transition duration-100 ease-in-out hover:border-gray-500/40 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="block appearance-none w-full text-gray-500 bg-white border  border-gray-400/20 hover:border-gray-500/40 px-4 py-2 pr-8 transition duration-100 ease-in-out rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-2 rounded transition duration-100 ease-in-out hover:bg-blue-800"
        >
          Sign Up
        </button>
        <p className="mt-4 text-sm text-center">
        Already have an account?{" "}
          <Link to="/" className="text-blue-600 underline">
          Login here
          </Link>
        </p>

        {mutation.isError && (
          <p className="text-red-500 mt-2">
            {(mutation.error as any)?.response?.data?.message || "Signup failed"}
          </p>
        )}

        {mutation.isSuccess && (
          <p className="text-green-600 mt-2">{successMsg}</p>
        )}
      </form>
    </div>
    </>
  );
}
