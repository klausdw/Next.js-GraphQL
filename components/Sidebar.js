import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();
  // console.log(router.pathname);

  return (
    <aside className="bg-blue-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <div>
        <p className="text-white text-2xl font-black">CMS</p>
      </div>
      <nav className="mt-5 list-none">
        <li
          className={
            router.pathname === "/" ? "bg-blue-500 rounded p-2" : "p-2"
          }
        >
          <Link href="/">
            <a className="text-white block">Kunden</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === "/bestellung"
              ? "bg-blue-500 rounded p-2"
              : "p-2"
          }
        >
          <Link href="/bestellung">
            <a className="text-white block">Bestellung</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === "/produkte" ? "bg-blue-500 rounded p-2" : "p-2"
          }
        >
          <Link href="/produkte">
            <a className="text-white block">Produkte</a>
          </Link>
        </li>
      </nav>

      <div className="sm:mt-10">
        <p className="text-white text-2xl font-black">Grafik / Statistik</p>
      </div>
      <nav className="mt-5 list-none">
        <li
          className={
            router.pathname === "/melhoresvendedores"
              ? "bg-blue-500 rounded p-2"
              : "p-2"
          }
        >
          <Link href="/melhoresvendedores">
            <a className="text-white block">Top Verkäufer</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === "/melhoresclientes"
              ? "bg-blue-500 rounded p-2"
              : "p-2"
          }
        >
          <Link href="/melhoresclientes">
            <a className="text-white block">Top Kunden</a>
          </Link>
        </li>
      </nav>
    </aside>
  );
};

export default Sidebar;
