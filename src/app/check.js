"use client";

import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";
export default function Redirect() {
  const lang = getCookie("lang");
  const token = getCookie("token");
  console.log(lang, token);
  if (lang != "" && token != "") {
    redirect("/home");
  }
  return <div></div>;
}
