export default function Overview({goals}) {
    const totalGoals = goals.length;
    const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
    const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount).length;

    const now = new Date();

    return (
       <div className="bg-white rounded-xl shadow-md p-6 mb-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4 text-center">Overview</h2>

             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mb-6">
                <div>
                     <p className="text-sm text-gray-600">Total Goals</p>
                     <p className="text-xl font-bold text-gray-900">{totalGoals}</p>
                     </div>
                     <div>
                        <p className="text-sm text-gray-600">Total Saved</p>
                        <p className="text-xl font-bold text-gray-800">${totalSaved.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Completed Goals</p>
                            <p className="text-xl font-bold text-gray-800">{completedGoals}</p>
                            </div>
                            </div>
                            <h3 className="text-lg font-medium text-gray-700 mb-2">Deadlines</h3>
                            <ul className="space-y-2">

            { goals.map(goal => {
                const deadline = new Date(goal.deadline);
                const daysLeft = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
                const isCompleted = goal.savedAmount >= goal.targetAmount;

                return (
                    <li key={goal.id} className="text-sm text-gray-700">
                        <strong>{goal.name}</strong> -{""}
                        {isCompeted?(
                            <span className="text-green-600 font-medium">Completed</span>
                        ) : (
                            <span className={daysleft <0 ?"text-red-600" :"text-yellow-600"}>
                                {daysLeft} days left
                            </span>
                        )}
                        </li>
                );
                })}
                </ul>
                </div>
                );
            }