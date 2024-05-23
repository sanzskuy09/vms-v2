"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/libs/hook";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";

const PageLayout = ({ children }) => {
  const router = useRouter();

  const [token, setToken] = useState("");

  useEffect(() => {
    const tokenExist =
      typeof window !== "undefined" && window.localStorage.getItem("token");
    setToken(tokenExist);
  }, []);

  // const authUser = useAppSelector((state) => state?.auth?.isLogin ?? false);

  // if (!authUser) return router.push("/login");

  // const tokenExist =
  //   typeof window !== "undefined" && localStorage.getItem("token");

  if (token === "" && token === null) return router.push("/login");

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8">{children}</div>
    </div>
  );
};

export default PageLayout;
