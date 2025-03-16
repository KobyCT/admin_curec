"use server";

import { cookies } from "next/headers";
import Product from "../components/card";

export default async function Products({ type }) {
  // Retrieve token from cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("token").value;

  if (!token) {
    return <p className="text-red-500">Unauthorized: No token found.</p>;
  }

  // Fetch product data
  const getProduct = async () => {
    try {
      let url;

      if (type === "Unapproved") {
        url = "https://backend-cu-recom.up.railway.app/api/products/approve";
      } else {
        url =
          "https://backend-cu-recom.up.railway.app/api/products?sort=createtime:DESC";
      }

      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      return await res.json();
    } catch (error) {
      console.error("Failed to fetch products:", error);
      return [];
    }
  };

  const data = await getProduct();

  if (data.length === 0) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <p className="text-gray-500">No products available.</p>
      </div>
    );
  }

  return (
    <div className="p-4 grid gap-4">
      {data.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          product_name={product.name}
          imageSrc={product.image || "/ph.png"}
          seller={product.sellerid}
          price={product.price}
          tag={["None"]}
        />
      ))}
    </div>
  );
}
