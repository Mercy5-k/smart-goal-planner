import { useEffect, useState } from 'react';
import { fetchGoals, updateGoal } from '../lib/goalAPI';
import { useRouter } from 'next/router';

export default function DepositPage() {
    const [amount, setAmount] = useState(''); 
    const [goals, setGoals] = useState([]);
    const [selectedGoalId, setSelectedGoalId] = useState('');
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Deposit to Goal</h2>
                </div>
                     <p className="text-gray-600 text-sm mb-6">Select a goal to deposit funds:</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Goal
                    </label>
                    <select
                        value={selectedGoalId}
                        onChange={(e) => setSelectedGoalId(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Select a Goal</option>
                        {goals.map(goal => (
                            <option key={goal.id} value={goal.id}>
                                {goal.name} - ${goal.savedAmount} saved
                            </option>
                        ))}
                    </select>
                    </div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Deposit Amount ($) </label>
                    <input
                        type="number"
                        placeholder="Deposit Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />

                    <button
                        type="submit"
                         className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors">
                        Deposit
                    </button>
                </form>
            </div>
        </div>
    );
}