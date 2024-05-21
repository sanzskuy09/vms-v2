"use client";

import LoginPage from "./login/page";
import Dashboard from "./(pages)/dashboard/page";

import { useAppSelector } from "@/libs/hook";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const authUser = useAppSelector((state) => state?.auth?.isLogin ?? false);
  // const authUser = localStorage.getItem("token");
  console.log(authUser);

  return authUser ? router.push("/dashboard") : router.push("/login");
}
