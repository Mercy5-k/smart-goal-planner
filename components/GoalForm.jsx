import { useState, useEffect } from "react";

export default function GoalForm({ onSubmit, initialGoal = {} }) {
    const [form, setForm] = useState({
        name: "",
        targetAmount: "",
        savedAmount: "",
        category: "",
        deadline: "",
    });

    useEffect(() => {
        if (initialData && Object.keys(initialGoal).length > 0) {
            setForm({...initialGoal });
        }
    }, [initialGoal]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: name === "savedAmount" || name === "targetAmount" ? parseFloat(value) : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                {initialGoal.id ? "Edit Goal" : "Create Goal"}</h2>
            </div>

            <input type="text"
                     name="name"
                     placeholder="Goal Name"
                     value={form.name}
                     onChange={handleChange}
                     required
                     className="w-full border border-gray-300 rounded-md p-2" />    

            <input type="number"
                     name="targetAmount"
                        placeholder="Target Amount"
                        value={form.targetAmount}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md p-2"/>

            <input type="number"
                     name="savedAmount" 
                        placeholder="Saved Amount"
                        value={form.savedAmount}
                        onChange={handleChange}
                        required 
                        className="w-full border border-gray-300 rounded-md p-2"/>

            <input type="text"
                     name="category"    
                        placeholder="Category"
                        value={form.category}
                        onChange={handleChange}
                        required 
                        className="w-full border border-gray-300 rounded-md p-2"/>

            <input type="date"
                     name="deadline"
                        placeholder="Deadline"
                        value={form.deadline}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md p-2" />

            <button type="submit"
             className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
                {initialGoal.id ? "Update Goal" : "Create Goal"}
            </button>
        </form>     
    );
}