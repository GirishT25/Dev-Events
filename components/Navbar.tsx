'use client';

import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <nav className="flex items-center justify-between px-8 py-4">
        
        <Link href="/" className="flex items-center">
          <Image
            src="/icons/logo.png"
            alt="App logo"
            width={24}
            height={24}
            priority
          />
        </Link>

        <ul className="flex items-center gap-8 list-none">
          <li>
            <Link href="/" className="hover:text-gray-300 transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/events" className="hover:text-gray-300 transition">
              Events
            </Link>
          </li>
          <li>
            <Link href="/events/create" className="hover:text-gray-300 transition">
              Create Event
            </Link>
          </li>
        </ul>

      </nav>
    </header>
  );
};

export default Navbar;
