import { useEffect, useState } from "react";
import { fetchGoals, deleteGoal } from "../lib/goalAPI";
import Overview from "../components/Overview"   
import Link from "next/link";

export default function Home() {
    const [goals, setGoals] = useState([]);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
    fetchGoals().then(setGoals);
    }, []);
    

    const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this goal?");
    if (!confirmDelete) return;

        try {
        setDeletingId(id);
        await deleteGoal(id);
        setGoals(goals.filter((goal) => goal.id !== id));
        } catch (error) {
        console.error("Failed to delete goal:", error);
        alert("Failed to delete goal. Please try again.");
        }finally {
          setDeletingId(null);
        }
    };
    
    const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);

    return (
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="bg-blue-600 text-black px-4 py-2">
            Smart Goal Planner
          </h1>
  
          <div className="mb-6 flex justify-between items-center">
            <p className="text-black px-4 py-2 bg-gray-900 rounded">
              Total Saved: ${totalSaved}
            </p>
            <div className="space-x-4">
              <Link href="/add" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Add Goal
              </Link>
              <Link href="/deposit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Deposit
              </Link>
            </div>
          </div>

          <hr className="my-6" />

          <Overview goals={goals} />

          <div className="mt-8 grid gap-6">
            {goals.map((goal) => (
              <div key={goal.id} className="p-4 border rounded shadow-sm">
                <h3 className="text-lg font-semibold">{goal.name}</h3>
                <p>Saved: ${goal.savedAmount} / Target: ${goal.targetAmount}</p>
                <div className="space-x-4 mt-2">
                  <Link href={`/edit/${goal.id}`} className="text-blue-600 hover:underline mr-4">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(goal.id)}
                    disabled={deletingId === goal.id}
                    className={`text-red-600 hover:underline ${deletingId === goal.id ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                    {deletingId === goal.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }