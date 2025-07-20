import { useState } from 'react';

export default function DepositForm({ goals, onDeposit }) {
    const [selectedGoalId, setSelectedGoalId] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
           const depositAmount = parseFloat(amount);
    if (depositAmount > 0) {    
      onDeposit(selectedGoalId, depositAmount);
      setAmount("");
    } else {
      alert("Please enter a valid deposit amount greater than 0.");
    }
  };

    return (
        <form onSubmit={handleSubmit}>
            <select
                value={selectedGoalId}
                onChange={(e) => setSelectedGoalId(e.target.value)}
                required
            >
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
    );
}