"use client";
import React from "react";
import { useAppSelector } from "@/libs/hook";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";

const PageLayout = ({ children }) => {
  const router = useRouter();

  const authUser = useAppSelector((state) => state?.auth?.isLogin ?? false);
  if (authUser) return router.push("/dashboard");
  console.log(authUser);

  return <div>{children}</div>;
};

export default PageLayout;
