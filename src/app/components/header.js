import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Header({ prevPage = "", Title = "None" }) {
  const router = useRouter();
  return (
    <nav className="p-4 flex justify-between items-center fixed top-0 left-0 w-full bg-white shadow-md z-50 ">
      <button onClick={router.back} className="text-2xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <h1 className="text-2xl font-bold">{Title}</h1>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      </div>
    </nav>
  );
}
