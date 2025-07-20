import { useEffect, useState } from 'react';
import { fetchGoals, updateGoal } from '../lib/goalAPI';
import { useRouter } from 'next/router';

export default function DepositPage() {}
    const [amount, setAmount] = useState(''); 
    const [goals, setGoals] = useState([]);
    const [selectedGoalId, setS] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetchGoals().then(setGoals);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const goal = goals.find(g => g.id === selectedGoalId);
        if (!goal) return;

        const newAmount = parseFloat(goal.savedAmount) + parseFloat(amount);
        await updateGoal(selectedGoalId, { savedAmount: newAmount });
        router.push("/");

    };

    return (
      <div className="max-w-xl mx-auto p-6 mt-8 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">Deposit to Goal</h2>
      <p className="mb-4 text-gray-700 text-sm text-center">Select a goal to deposit funds:</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <select value={selectedGoalId} onChange={(e) => setSelectedGoalId(e.target.value)} required
                    className="w-full border border-gray-300 rounded-md p-2 text-gray-700">
                    <option value="">Select a Goal</option>
                    {goals.map(goal => (
                        <option key={goal.id} value={goal.id}>
                            {goal.name} - ${goal.savedAmount} saved
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    placeholder="Deposit Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                     className="w-full border border-gray-300 rounded-md p-2"
                />
                <button type="submit">
                     className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                     Deposit</button>
            </form>
        </div>
    );