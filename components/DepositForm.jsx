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
        <form onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
             <h2 className="text-xl font-semibold text-center text-green-600">Deposit to Goal</h2>
             <select
             value={selectedGoalId}
             onChange={(e) => setSelectedGoalId(e.target.value)}
             required
             className="w-full border border-gray-300 rounded-md p-2  ">

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
            <button type="submit"
             className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200">
                Deposit</button>
                </form>
    );
}