import { useEffect, useState } from "react";
import { fetchGoals, deleteGoal } from "../lib/goalAPI";
import GoalCard from "../components/GoalCard";
import Overview from "../components/Overview"   
import Link from "next/link";

export default function Home() {
    const [goals, setGoals] = useState([]);

    useEffect(() => {
    fetchGoals().then(setGoals);
    }, []);
    
    const handleDelete = async (id) => {
        try {
        await deleteGoal(id);
        setGoals(goals.filter((goal) => goal.id !== id));
        } catch (error) {
        console.error("Failed to delete goal:", error);
        }
    };
    
    const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);

    return (
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">
            Smart Goal Planner
          </h1>
  
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-medium text-gray-800">
              Total Saved: ${totalSaved}
            </p>
            <div className="space-x-4"></div>
            <Link href="/add" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Add Goal
            </Link>
            <Link href="/deposit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Deposit
            </Link>
          </div>
  
          <hr className="my-6" />
  
          <Overview goals={goals} />
  
          <div className="mt-8 grid gap-6">
            {goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} onDelete={() => handleDelete(goal.id)} />
            ))}
          </div>
        </div>
      );
    }