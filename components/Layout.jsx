import Link from "next/link";
import NavBar from "./NavBar";



export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <NavBar />
      <div className="flex-1">
        <nav className="p-4">
          <ul>
            <li>
              <Link href="/" className="text-gray-700 hover:text-indigo-600">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/add" className="text-gray-700 hover:text-indigo-600">
                Add Goal
              </Link>
            </li>
            <li>
              <Link href="/deposit" className="text-gray-700 hover:text-indigo-600">
                Deposit
              </Link>
            </li>
            <li>
              <Link href="/goals" className="text-gray-700 hover:text-indigo-600">
                View Goals
              </Link>
            </li>
          </ul>
        </nav>
        <main className="flex-grow p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
