"use client";
import React from "react";
import { useAppSelector } from "@/libs/hook";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";

const PageLayout = ({ children }) => {
  const router = useRouter();

  const authUser = useAppSelector((state) => state?.auth?.isLogin ?? false);

  if (!authUser) return router.push("/login");
  console.log(authUser);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8">{children}</div>
    </div>
  );
};

export default PageLayout;
