"use client";

import { useEffect, useState } from "react";
import { fetchGoals, deleteGoal } from "../lib/goalAPI";
import GoalCard from "../components/GoalCard";
import Link from "next/link";

export default function HomePage() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetchGoals().then(setGoals);
  }, []);

  const handleDelete = async (id) => {
    await deleteGoal(id);
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold"> Smart Goal Planner</h1>
      <p className="text-lg">Total Saved: ${totalSaved}</p>
      <div className="flex gap-4">
        <Link href="/add" className="text-blue-500 hover:underline">
           Add Goal
        </Link>
        <Link href="/deposit" className="text-green-500 hover:underline">
         Deposit
        </Link>
      </div>
      <hr />
      <div className="space-y-6">
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
