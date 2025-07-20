import Layout from '../components/Layout';
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
        <Layout>
       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10">
        <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Deposit to Goal</h2>
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
                        <option value="">Choose a Goal</option>
                        {goals.map(goal => (
                            <option key={goal.id} value={goal.id}>
                                {goal.name} - ${goal.savedAmount} saved
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deposit Amount ($) 
                    </label>

                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors">
                    Deposit
                </button>
            </form>
        </div>
        </div>
        </Layout>
    );
}