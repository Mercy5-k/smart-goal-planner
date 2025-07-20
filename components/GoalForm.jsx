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
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-semibold text-center text-blue-600">
                {initialGoal.id ? "Edit Goal" : "Create Goal"}</h2>

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
             className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
                {initialGoal.id ? "Update Goal" : "Create Goal"}
            </button>
        </form>     
    );
}