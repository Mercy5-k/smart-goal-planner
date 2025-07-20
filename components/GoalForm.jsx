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
            setForm({...initialData });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: name === "savedAmount" || name === "targetAmount" ? parseFloat(value) : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{initialData.id ? "Edit Goal" : "Create Goal"}</h2>

            <input type="text"
                     name="name"
                     placeholder="Goal Name"
                     value={form.name}
                     onChange={handleChange}
                     required />    

            <input type="number"
                     name="targetAmount"
                        placeholder="Target Amount"
                        value={form.targetAmount}
                        onChange={handleChange}
                        required />

            <input type="number"
                     name="savedAmount" 
                        placeholder="Saved Amount"
                        value={form.savedAmount}
                        onChange={handleChange}
                        required />

            <input type="text"
                     name="category"    
                        placeholder="Category"
                        value={form.category}
                        onChange={handleChange}
                        required />

            <input type="date"
                     name="deadline"
                        placeholder="Deadline"
                        value={form.deadline}
                        onChange={handleChange}
                        required />

            <button type="submit">
                {initialData.id ? "Update Goal" : "Create Goal"}
            </button>
        </form>     
    );
}