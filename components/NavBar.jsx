import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
      <h1 className="text-xl font-bold tracking-wide">Smart Goal Planner</h1>
      <div className="flex gap-6 text-sm sm:text-base">

        <Link href="/"  className="hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded">Home</Link>
        <Link href="/add" className="hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded"> Add Goal</Link>
        <Link href="/deposit"  className="hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded">Deposit</Link>
      </div>
      </div>
    </nav>
  );
}

export default NavBar;