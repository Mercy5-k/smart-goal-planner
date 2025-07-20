export default function Overview({goals}) {
    const totalGoals = goals.length;
    const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
    const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount).length;

    const now = new Date();

    return (
        <div className="overview">
            <p><strong>Total Goals: </strong>{totalGoals}</p>
            <p><strong>Total Saved: </strong>{totalSaved}</p>
            <p><strong>Completed Goals: </strong>{completedGoals}</p>

            <h3>Deadlines:</h3>
            { goals.map(goal => {
                const deadline = new Date(goal.deadline);
                const daysLeft = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
                const isCompleted = goal.savedAmount >= goal.targetAmount;

                if (isCompleted) {
                    return (
                        <p key={goal.id}>
                            <strong>{goal.name}</strong> - Completed
                        </p>
                    );
                }
                return (
                    <p key={goal.id}>
                        <strong>{goal.name}</strong> - {daysLeft} days left
                    </p>
                );
            })}
        </div>
    );
}