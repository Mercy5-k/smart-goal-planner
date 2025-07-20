import { useEffect, useState } from "react";
import { fetchGoals, deleteGoal } from "../lib/goalAPI";
import GoalCard from "../components/GoalCard";
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
        <div style={{ padding: "20px" }}>
        <h1>Smart Goal Planner</h1>
        <p>Total Saved: ${totalSaved}</p>
        <Link href="/add"> Add Goal</Link> style={{ marginBottom: "20px", display: "inline-block" }}
        <Link href="/deposit">Deposit</Link> style={{ marginLeft: "10px", display: "inline-block" }}
        <hr/>
        {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} onDelete={() => handleDelete(goal.id)} />
        ))}
            </div>
        );
    }