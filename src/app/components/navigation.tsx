// components/Navbar.js
import Link from 'next/link';

export const Navigation = () => {
  return (
      <div className="bg-transparent py-1 flex justify-center">
        <nav className="space-x-8 text-white text-lg">
          <Link href="/" className="hover:text-blue-400 transition-colors">
            Home
          </Link>
          <Link href="/about" className="hover:text-blue-400 transition-colors">
            About
          </Link>
          <Link href="/upload" className="hover:text-blue-400 transition-colors">
            Generator
          </Link>
        </nav>
      </div>
  );
}
