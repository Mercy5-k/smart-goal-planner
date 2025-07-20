import { useEffect, useState } from "react";
import { fetchGoals, updateGoal } from "../lib/goalAPI";
import { useRouter } from "next/router";
import GoalForm from "../components/GoalForm";

export default function EditGoalPage() {
    const [goal, setGoal] = useState(null);
    const [form, setForm] = useState({
        name: '',
        targetAmount: '',
        savedAmount: 0,
        category: '',
        deadline: ''
    });
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            fetchGoals().then(goals => {
                const foundGoal = goals.find(g => g.id === id);
                if (foundGoal) {
                    setGoal(foundGoal);
                    setForm({
                        name: foundGoal.name,
                        targetAmount: foundGoal.targetAmount,
                        savedAmount: foundGoal.savedAmount,
                        category: foundGoal.category,
                        deadline: foundGoal.deadline
                    });
                }
            });
        }
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateGoal(id, form);
        router.push('/');
    };

    if (!goal) return <p>Loading...</p>;

    return (
        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
            <h2>Edit Goal</h2>
            <input name="name" placeholder="Goal Name" value={form.name} onChange={handleChange} required />
            <input name="targetAmount" type="number" placeholder="Target Amount" value={form.targetAmount} onChange={handleChange} required />
            <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
            <input name="deadline" type="date" value={form.deadline} onChange={handleChange} required />
            <button type="submit">Update Goal</button>
        </form>
    );
}