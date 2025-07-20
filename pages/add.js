import { useState } from 'react';
import { addGoal } from '../lib/goalAPI';
import { useRouter } from 'next/router';


export default function AddGoalPage() {
    const [form, setForm] = useState({
        name: '',
        targetAmount: '',
        savedAmount: 0,
        category: '',
        createdAt: new Date().toISOString()
    });

    const router = useRouter();

    const handleChange = (e) => 
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addGoal(form);
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add New Goal</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                   <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. Buy a Laptop"
            />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Amount</label>
            <input
              name="targetAmount"
              type="number"
              value={form.targetAmount}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. 1000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select a category</option>
              <option value="Travel">Travel</option>
              <option value="Emergency">Emergency</option>
              <option value="Education">Education</option>
              <option value="Shopping">Shopping</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
            <input
              name="deadline"
              type="date"
              value={form.deadline}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition duration-200"
          >
            Create Goal
          </button>
        </form>
      </div>
    </div>
  );
}