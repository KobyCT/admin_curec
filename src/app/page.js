import Image from "next/image";
import Sidebar from "./components/Topnav";
import Link from "next/link";
import TopNavbar from "./components/Topnav";
//
export default function Home() {
  return (
    <div>
      <TopNavbar />
      <div className="mt-20">
        <h1 className="text-black text-xl text-center text-bold">Help :(</h1>
      </div>
    </div>
  );
}
