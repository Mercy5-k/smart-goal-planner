import { useEffect, useState } from "react";
import { fetchGoals, updateGoal } from "../../lib/goalAPI";
import { useRouter } from "next/router";

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

if (!goal) {
    return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <p className="text-gray-600 text-lg" >Loading...</p>
    </div>
    );  
}
    return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Edit Goal</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Goal Name</label>
                <input
                    name="name"
                    type="text"
                    placeholder="Goal Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Target Amount</label>
                <input
                    name="targetAmount"
                    type="number"
                    placeholder="Target Amount"
                    value={form.targetAmount}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                    name="category"
                    type="text"
                    placeholder="Category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"    
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Deadline</label>
                <input
                    name="deadline"
                    type="date"
                    value={form.deadline}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />  
            </div>  
            <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Update Goal
            </button>
        </form>
        </div>
      </div>
        </div>
    );
}   