import { useState } from 'react';
import { addGoal } from '../lib/goalAPI';
import { useRouter } from 'next/router';

export default function AddGoalPage() {
    const [form, setForm] = useState({
        name: '',
        targetAmount: '',
        savedAmount: '',
        category: '',
        savedAmount: 0,
        createdAt: new Date().toISOString()
    });
}

    const router = useRouter();

    const handleChange = (e) => 
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addGoal(form);
        router.push('/');
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
            <h2>Add New Goal</h2>
            <input name="name" placeholder="Goal Name" value={form.name} onChange={handleChange} required />
            <input name="targetAmount" type="number" placeholder="Target Amount" onChange={handleChange} required />
            <input name="category" placeholder="Category" onChange={handleChange} required />
            <input named="deadline" type="date" onChange={handleChange} required />
            <button type="submit">Create Goal</button>
            </form>
    );
