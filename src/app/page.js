import ServerComponent from "./getToken";

export default async function Main({ searchParams }) {
  const para = await searchParams;
  return (
    <div>
      <ServerComponent searchParams={para} />
    </div>
  );
}
