"use client";

import { setCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function PassToken({ name, arg, name2, arg2 }) {
  const router = useRouter();
  setCookie(name, arg);
  setCookie(name2, arg2);
  router.refresh();

  return <div></div>;
}
