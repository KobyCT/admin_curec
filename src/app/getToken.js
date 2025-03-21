import { getTokenAndSetCookie } from "./actions";
import { redirect } from "next/navigation";
import PassToken from "./smallchild";
import { cookies } from "next/headers";

export default async function ServerComponent({ searchParams }) {
  const cookieStore = await cookies();
  const { token, lang } = searchParams || {};
  console.log(token);
  const storedToken = cookieStore.get("token");
  if (storedToken?.value && storedToken?.value != undefined) {
    redirect("/productA");
  }
  if (token == null) {
    return <div className="text-xl">Please re enter the site via CUNEX</div>;
  }
  // Only attempt to get token if one was provided
  let cunextoken = null;
  if (token) {
    cunextoken = await getTokenAndSetCookie(token);
  }
  const authtoken = cunextoken.token;
  console.log(authtoken);
  return (
    <div>
      <h2>Server Component</h2>
      <p>Token: {token ? "Received" : "Not provided"}</p>
      <p>Language: {lang || "Not provided"}</p>
      <p>
        Status:{" "}
        {cunextoken?.error ? `Error: ${cunextoken.error}` : "Token processed"}
      </p>
      <PassToken
        name="token"
        arg="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwMDE3MDY3MDc0OTIwMDAwMDIzMiIsImlhdCI6MTc0MjQ2NzA5MywiZXhwIjoxNzQ1MDU5MDkzfQ.32J-A7cefJwebPIS0raBD_Y7Ca7X4Sfp3Oe1kHPnCPU"
        name2="lang"
        arg2={lang}
      />
    </div>
  );
}
