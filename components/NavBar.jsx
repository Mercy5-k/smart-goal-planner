import Link from "next/link";

const NavBar = () => (
  <nav className="bg-gray-900 rounded-b-lg">
    <div className="container mx-auto flex justify-between items-center">
    <h1 className="text-white text-lg font-bold">Smart Goal Planner</h1>
      <Link href="/" className="hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded">Home</Link>
      <Link href="/add" className="hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded">Add Goal</Link>
    <Link href="/deposit" className="hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded">Deposit</Link>
    </div>
  </nav>
);

export default NavBar;