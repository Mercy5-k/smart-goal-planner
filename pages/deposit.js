import { useEffect, useState } from 'react';
import { fetchGoals, updateGoal } from '../lib/goalAPI';
import { useRouter } from 'next/router';
import DepositForm from '../components/DepositForm';

export default function DepositPage() {}
    const [amount, setAmount] = useState(''); 
    const [goals, setGoals] = useState([]);
    const [selectedGoalId, setSelectedGoalId] = useState('');
    const [depositAmount, setDepositAmount] = useState('');
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
        <div style={{ padding: '20px' }}>
            <h2>Deposit to Goal</h2>
            <p>Select a goal to deposit funds:</p>
            <form onSubmit={handleSubmit}>
                <select value={selectedGoalId} onChange={(e) => setSelectedGoalId(e.target.value)} required>
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
                />
                <button type="submit">Deposit</button>
            </form>
        </div>
    );