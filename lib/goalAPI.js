const BASE_URL = "http://localhost:3001/goals";

export const fetchGoals = async () => {
    const response = await fetch(BASE_URL);
    return response.json();
}

export const addGoal = async (goal) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(goal),
    });
    return response.json();
};

export const updateGoal = async (id, updates) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
    });
    return response.json();
};

export const deleteGoal = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete goal');
    }
    return response.json();
}