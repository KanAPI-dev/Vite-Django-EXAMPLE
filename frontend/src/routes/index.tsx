import { createFileRoute, Link } from "@tanstack/react-router";

import { useAuthStore } from "@/lib/store";

import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import djangoLogo from "../assets/django.svg";
import tailwindLogo from "../assets/tailwind.svg";
import { logout } from "@/api/endpoints";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const user = useAuthStore((state) => state.user);
  const logoutUser = useAuthStore((state) => state.logout);

  /**
   * The AllAuth API does NOT return a 200 status on successful logout...
   * So the only way to clear the user from the zustand store is to do
   * so during the error catcher. Kinda concerning since logging out could
   * error due to network issues, so this could be problematic...
   */
  const handleLogout = () => {
    logout().catch(() => logoutUser());
  };

  return (
    <main className="container flex-1 flex flex-col justify-center items-center">
      <div className="flex items-center lg:gap-15">
        <a href="https://vite.dev" target="_blank">
          <img
            src={viteLogo}
            className="h-24 p-4 transition-filter duration-300 hover:drop-shadow-[0_0_2rem_#646cffaa]"
            alt="Vite logo"
          />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="h-24 p-4 transition-filter duration-300 hover:drop-shadow-[0_0_2rem_#61dafbaa]"
            alt="React logo"
          />
        </a>
        <a href="https://tailwindcss.com/" target="_blank">
          <img
            src={tailwindLogo}
            className="h-24 p-4 transition-filter duration-300 hover:drop-shadow-[0_0_2rem_#38BDF8aa]"
            alt="Tailwind logo"
          />
        </a>
        <a href="https://www.djangoproject.com/" target="_blank">
          <img
            src={djangoLogo}
            className="h-24 p-4 transition-filter duration-300 hover:drop-shadow-[0_0_2rem_#092E20aa]"
            alt="Django logo"
          />
        </a>
      </div>
      <h1 className="text-xl lg:text-5xl">Vite + React + Tailwind + Django</h1>
      <p className="p-4">
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
      <p className="text-stone-400">Click on the logos to learn more</p>
      <div className="pt-4">
        {user ? (
          <button
            onClick={handleLogout}
            className="p-2 cursor-pointer bg-red-500 hover:bg-red-700 text-white rounded-md"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/auth"
            className="p-2 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white rounded-md"
          >
            Login
          </Link>
        )}
      </div>
    </main>
  );
}
