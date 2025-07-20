import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">Smart Goal Planner</h1>
      <div className="flex gap-4 text-sm">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/add" className="hover:underline"> Add Goal</Link>
        <Link href="/deposit" className="hover:underline">Deposit</Link>
      </div>
    </nav>
  );
}

export default NavBar;