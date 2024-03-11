"use client";
import { useSession } from "next-auth/react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const DashboardPage = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/dashboard");
    },
  });
  if (!session?.user) return;

  return (
    <section className="flex flex-col gap-6">
      <h1>Dashbord</h1>
      <h1>{session?.user.name}</h1>
      <h2 className="text-black">{session?.user.email}</h2>
    </section>
  );
};

export default DashboardPage;
