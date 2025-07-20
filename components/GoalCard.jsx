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

    const statusColor =
    status === "Completed"
      ? "text-green-600"
      : status === "Overdue"
      ? "text-red-600"
      : status === "Behind Schedule"
      ? "text-yellow-600"
      : "text-blue-600";

  const progressBarColor =
    progress === 100
      ? "bg-green-500"
      : isOverdue
      ? "bg-red-500"
      : "bg-blue-500";

    return (
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow space-y-4">
      <div className="flex justify-between items-start">
        <div>
            <h3 className="text-xl font-semibold text-gray-800">{goal.name}</h3>
            <p className="text-sm text-gray-500">{goal.category}</p>
        </div>
        <span className={`text-sm font-medium ${statusColor}`}>{status}
        </span>
        </div>
                <div>
               <p className="text-gray-600">
                  ${goal.savedAmount.toLocaleString()} saved of
                  ${goal.targetAmount.toLocaleString()}
                </p>
             <div className="w-full bg-gray-200 rounded-full h-3 mt-1">
          <div
            className={`h-3 rounded-full ${progressBarColor}`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
        <p className="text-right text-xs text-gray-500 mt-1">
          {progress.toFixed(1)}%
        </p>
      </div>

      <p className="text-sm text-gray-600">
        Remaining:{" "}
        <span className="font-semibold">
          ${remaining > 0 ? remaining.toLocaleString() : 0}
        </span>
      </p>

      <p className="text-sm text-gray-600">
        Deadline:{" "}
        <span className="font-medium">
          {deadline.toLocaleDateString()} ({isOverdue ? "Overdue" : `${daysLeft} days left`})
        </span>
      </p>

      <div className="flex justify-end gap-4 mt-4">
        <Link
          href={`/edit/${goal.id}`}
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(goal.id)}
          className="text-sm font-medium text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}