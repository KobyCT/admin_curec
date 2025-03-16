"use client";
import TopNavbar from "../components/Topnav";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProductInspection({ children }) {
  const [selected, setSelected] = useState("Unapproved");
  const [clientReady, setClientReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setClientReady(true);
  }, []);

  // Update route when selected changes
  useEffect(() => {
    if (clientReady) {
      router.push(`/productA?type=${selected}`);
    }
  }, [selected, clientReady, router]);

  return (
    <div>
      <TopNavbar />
      <div className="mt-8">
        <h1 className="text-black text-xl text-center text-bold">
          Product Inspection: {selected}
        </h1>
        <div className="grid grid-cols-2 gap-2">
          <button
            className="bg-pink-400 text-white rounded-full px-4 py-2"
            onClick={() => setSelected("Unapproved")}
          >
            Unapproved
          </button>
          <button
            className="bg-pink-400 text-white rounded-full px-4 py-2"
            onClick={() => setSelected("Approved")}
          >
            Approved
          </button>
        </div>
        <div className="flex-grow flex flex-col pt-24 pb-16">
          <div className="flex-grow">
            {clientReady ? (
              children
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mt-8"></div>
                <p className="text-gray-500 mt-4">กำลังโหลด...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
