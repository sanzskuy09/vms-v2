"use client";
import React from "react";
import { useAppSelector } from "@/libs/hook";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";

const PageLayout = ({ children }) => {
  const router = useRouter();

  const authUser = useAppSelector((state) => state?.auth?.isLogin ?? false);

  const tokenExist =
    typeof window !== "undefined" && window.localStorage.getItem("token");

  if (tokenExist !== null && tokenExist !== "")
    return router.push("/dashboard");

  return <div>{children}</div>;
};

export default PageLayout;
