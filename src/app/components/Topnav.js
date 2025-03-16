"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const TopNavbar = () => {
  const router = useRouter();

  return (
    <header className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold">Admin Panel</span>
          </div>
          <nav className="flex items-center space-x-4">
            <Link href="/productA">Product Inspection</Link>
            <Link href="/users">Users</Link>
            <Link href="/">:(</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
