"use server";

export async function getTokenAndSetCookie(token) {
  try {
    const response = await fetch(
      `https://backend-cu-recom.up.railway.app/api/auth/callback?token=${token}`
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const cunextoken = await response.json();
    console.log("Received Token:", cunextoken);

    // Get full URL for the API route
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"; // Change to your production URL

    // Call the API route to securely set the cookie

    return cunextoken;
  } catch (error) {
    console.error("Failed to fetch token:", error);
    return { error: error.message };
  }
}
