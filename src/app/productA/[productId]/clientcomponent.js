"use client";

import { useState, useEffect } from "react";
import { Heart, ShoppingBag, ArrowLeft, Share2 } from "lucide-react";
import Header from "@/app/components/header";
import NavItem from "@/app/components/Navbar";
import { deleteProduct } from "./delete";
import { getCookie } from "cookies-next";

const handleDelete = async (productId) => {
  if (!confirm("คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?")) return;
  const token = getCookie("token");
  const response = await deleteProduct(productId, token);

  if (response.success) {
    alert("สินค้าถูกลบเรียบร้อยแล้ว!");
    window.location.href = "/productA"; // Redirect after deletion
  } else {
    alert("เกิดข้อผิดพลาดในการลบสินค้า: " + response.error);
  }
};

const handleApprove = async (productId) => {
  const token = getCookie("token");
  try {
    const res = await fetch(
      `https://backend-cu-recom.up.railway.app/api/products/approve/${productId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) throw new Error("Approval failed");

    alert("สินค้าถูกอนุมัติแล้ว!");
    window.location.reload();
  } catch (error) {
    console.error("Approval error:", error);
    alert("เกิดข้อผิดพลาดในการอนุมัติสินค้า");
  }
};

const handleUnapprove = async (productId) => {
  const token = getCookie("token");
  try {
    const res = await fetch(
      `https://backend-cu-recom.up.railway.app/api/products/unapprove/${productId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) throw new Error("Unapproval failed");

    alert("สินค้าถูกยกเลิกการอนุมัติแล้ว!");
    window.location.reload();
  } catch (error) {
    console.error("Unapproval error:", error);
    alert("เกิดข้อผิดพลาดในการยกเลิกอนุมัติสินค้า");
  }
};

const handleApproveLoud = async (productId) => {
  const token = getCookie("token");
  try {
    // Step 1: Approve the product
    const res = await fetch(
      `https://backend-cu-recom.up.railway.app/api/products/approve/${productId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) throw new Error("Approval failed");

    // Step 2: Fetch product data to get the seller's ID
    let productData;
    try {
      const product = await fetch(
        `https://backend-cu-recom.up.railway.app/api/products/${productId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!product.ok) throw new Error("Failed to fetch product");

      productData = await product.json(); // We need to use `await` to get the data
    } catch (error) {
      console.error("Error fetching product:", error);
      alert("เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า");
      return;
    }

    // Step 3: Send notification
    try {
      const noti = await fetch(
        `https://backend-cu-recom.up.railway.app/api/noti/send`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: productData.data[0].sellerid, // Assuming productData contains the seller's ID
            text_TH: `สินค้า ${productData.data[0].name} ของคุณได้รับการอนุมัติแล้ว`,
            text_EN: `Your product "${productData.data[0].name}" has been approved!`,
            callbackUrl: `https://cu-recom-production.up.railway.app/shop/${productId}`,
          }),
        }
      );

      if (!noti.ok) throw new Error("Notification failed");

      alert("สินค้าถูกอนุมัติแล้วและแจ้งเตือนไปยังผู้ขาย!");
      window.location.reload();
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("เกิดข้อผิดพลาดในการแจ้งเตือน");
    }
  } catch (error) {
    console.error("Approval error:", error);
    alert("เกิดข้อผิดพลาดในการอนุมัติสินค้า");
  }
};

const handleUnapproveLoud = async (productId) => {
  const token = getCookie("token");
  try {
    // Step 1: Approve the product
    const res = await fetch(
      `https://backend-cu-recom.up.railway.app/api/products/unapprove/${productId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) throw new Error("Approval failed");

    // Step 2: Fetch product data to get the seller's ID
    let productData;
    try {
      const product = await fetch(
        `https://backend-cu-recom.up.railway.app/api/products/${productId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!product.ok) throw new Error("Failed to fetch product");

      productData = await product.json(); // We need to use `await` to get the data
    } catch (error) {
      console.error("Error fetching product:", error);
      alert("เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า");
      return;
    }

    // Step 3: Send notification
    try {
      const noti = await fetch(
        `https://backend-cu-recom.up.railway.app/api/noti/send`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: productData.data[0].sellerid, // Assuming productData contains the seller's ID
            text_TH: `สินค้า ${productData.data[0].name} ของคุณได้ถูกยกเลิกการอนุมัติแล้ว`,
            text_EN: `Your product "${productData.data[0].name}" has been unapproved`,
            callbackUrl: `https://cu-recom-production.up.railway.app/shop/${productId}`,
          }),
        }
      );

      if (!noti.ok) throw new Error("Notification failed");

      alert("สินค้าถูกยกเลิกการอนุมัติแล้วและแจ้งเตือนไปยังผู้ขาย!");
      window.location.reload();
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("เกิดข้อผิดพลาดในการแจ้งเตือน");
    }
  } catch (error) {
    console.error("Approval error:", error);
    alert("เกิดข้อผิดพลาดในการยกเลิกการอนุมัติสินค้า");
  }
};

export default function ProductPage({ children, params }) {
  const [clientReady, setClientReady] = useState(false);
  const [product, setProduct] = useState(null);
  const [isapprove, setisapprove] = useState(false);

  useEffect(() => {
    setClientReady(true);

    // Fetch product data
    const fetchProduct = async () => {
      const token = getCookie("token");
      try {
        const res = await fetch(
          `https://backend-cu-recom.up.railway.app/api/products/${params}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setProduct(data);
        setisapprove(data.data[0].isapprove);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [params]);
  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="mb-10">
        {/* Header */}
        <Header Title="สินค้า" />

        {/* Main content */}
        {clientReady ? (
          children
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center">
            {/* Spinner Animation */}
            <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mt-8"></div>
            <p className="text-gray-500 mt-4">กำลังโหลด...</p>
          </div>
        )}

        {/* Show Delete Button Only if User is Seller */}
        <div className="mb-20">
          <div className="grid grid-cols-3">
            {isapprove === false ? (
              <button
                className="bg-green-500 text-white rounded-full px-4 py-2"
                onClick={() => handleApprove(params)}
              >
                อนุมัติ
              </button>
            ) : (
              <button
                className="bg-yellow-500 text-white rounded-full px-4 py-2"
                onClick={() => handleUnapprove(params)}
              >
                ยกเลิกอนุมัติ
              </button>
            )}
            {isapprove === false ? (
              <button
                className="bg-green-500 text-white rounded-full px-4 py-2"
                onClick={() => handleApproveLoud(params)}
              >
                อนุมัติ (LOUD)
              </button>
            ) : (
              <button
                className="bg-yellow-500 text-white rounded-full px-4 py-2"
                onClick={() => handleUnapproveLoud(params)}
              >
                ยกเลิกอนุมัติ(LOUD)
              </button>
            )}

            <button
              className="bg-pink-400 text-white rounded-full px-4 py-2"
              onClick={() => handleDelete(params)}
            >
              ลบสินค้า
            </button>
          </div>
        </div>
        <div className="mt-10"></div>
      </div>
      {/* Footer with action buttons */}
    </div>
  );
}
