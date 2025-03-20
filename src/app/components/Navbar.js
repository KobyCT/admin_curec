import Link from "next/link";

export default function NavItem({
  shop = false,
  favorites = false,
  profile = false,
  home = false,
}) {
  let sM, fM, pM, hM;
  if (shop) {
    sM = "text-pink-500";
  } else {
    sM = "text-gray-400";
  }
  if (favorites) {
    fM = "text-pink-500";
  } else {
    fM = "text-gray-400";
  }
  if (profile) {
    pM = "text-pink-500";
  } else {
    pM = "text-gray-400";
  }
  if (home) {
    hM = "text-pink-500";
  } else {
    hM = "text-gray-400";
  }
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="container mx-auto flex justify-evenly items-center py-2">
        <Link href="/" className={`flex flex-col items-center ${hM}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="text-xs">Home</span>
        </Link>

        <Link href="/shop" className={`flex flex-col items-center ${sM}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <span className="text-xs">Shop</span>
        </Link>

        <div className="flex flex-col items-center">
          <Link
            href="/addItem"
            className="h-14 w-14 bg-pink-500 rounded-full flex items-center justify-center -mt-5 text-white shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </Link>
        </div>

        <Link
          href="https://chatcunex888.onrender.com/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwMDE3MDY3MDc0OTIwMDAwMDIzMiIsImlhdCI6MTc0MjQ2NzA5MywiZXhwIjoxNzQ1MDU5MDkzfQ.32J-A7cefJwebPIS0raBD_Y7Ca7X4Sfp3Oe1kHPnCPU"
          className={`flex flex-col items-center ${fM}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.25211 15.5813H21.7479V14.5021H5.25211V15.5813ZM5.25211 10.9563H21.7479V9.87711H5.25211V10.9563ZM5.25211 6.33127H21.7479V5.25211H5.25211V6.33127ZM26.9125 25.0625L22.5959 20.7459H2.40002C1.73197 20.7459 1.17954 20.5275 0.742733 20.0906C0.305927 19.6538 0.0875244 19.1014 0.0875244 18.4334V2.40002C0.0875244 1.73197 0.305927 1.17954 0.742733 0.742733C1.17954 0.305927 1.73197 0.0875244 2.40002 0.0875244H24.6C25.2681 0.0875244 25.8205 0.305927 26.2573 0.742733C26.6941 1.17954 26.9125 1.73197 26.9125 2.40002V25.0625ZM2.40002 19.6667H23.0584L25.8334 22.4417V2.40002C25.8334 2.09169 25.7049 1.80905 25.4479 1.55211C25.191 1.29516 24.9084 1.16669 24.6 1.16669H2.40002C2.09169 1.16669 1.80905 1.29516 1.55211 1.55211C1.29516 1.80905 1.16669 2.09169 1.16669 2.40002V18.4334C1.16669 18.7417 1.29516 19.0243 1.55211 19.2813C1.80905 19.5382 2.09169 19.6667 2.40002 19.6667Z"
            />
          </svg>
          <span className="text-xs">Chat</span>
        </Link>

        <Link href="/profile" className={`flex flex-col items-center ${pM}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </div>
  );
}
