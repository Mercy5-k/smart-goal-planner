import Link from "next/link";

export default function GoalCard({ goal, onDelete }) {
    const progress = (goal.savedAmount / goal.targetAmount) * 100;
    const remaining = goal.targetAmount - goal.savedAmount;
    const deadline = new Date(goal.deadline);
    const now = new Date();
    const daysLeft = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
    const isOverdue = daysLeft < 0;

    let status = "On Track";
    if (isOverdue) {
        status = "Overdue";
    } else if (progress < 50) {
        status = "Behind Schedule";
    } else if (progress >= 50 && progress < 100) {
        status = "On Track";
    } else if (progress === 100) {
        status = "Completed";
    }

    return (
        <div style={{ border: "1px solid #ccc", padding: "20px", marginBottom: "20px" }}>
            <h3>{goal.name}</h3>
            <p>Category: {goal.category}</p>
            <p>Saved Amount: ${goal.savedAmount} </p>
            <div style={{ width: "100%", backgroundColor: "#f3f3f3", borderRadius: "5px" }}>
                <div
                    style={{
                        width: `${progress}%`,
                        backgroundColor: progress === 100 ? "green" : "blue",
                        height: "20px",
                        borderRadius: "5px"
                    }}
                ></div>
            </div>
            <p>Progress: {progress.toFixed(2)}%</p>
            <p>Remaining: ${remaining}</p>
            <p>Deadline: {deadline.toLocaleDateString()} ({daysLeft} days left
            {isOverdue ? " - Overdue" : ""})</p>
            <p>Status: {status}</p>
            <div>
                <Link href={`/edit/${goal.id}`} style={{ marginRight: "10px" }}>Edit</Link>
                <button onClick={() => onDelete(goal.id)} style={{ backgroundColor: "red", color: "white", border: "none", padding: "5px 10px" }}>
                    Delete
                </button>
            </div>
        </div>
    );
}

