"use server";

export async function deleteProduct(productId, token) {
  try {
    const res = await fetch(
      `https://backend-cu-recom.up.railway.app/api/products/${productId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!res.ok) throw new Error(`Failed to delete product: ${res.status}`);

    return { success: true };
  } catch (error) {
    console.error("Delete failed:", error);
    return { success: false, error: error.message };
  }
}
