// JobCard.jsx
export default function JobCard({ job, onEdit, onDelete }) {
    return (
        <div className="bg-white shadow-md rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between transition hover:shadow-lg border border-gray-100">
            <div className="mb-4 sm:mb-0">
                <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
                <p className="text-sm text-gray-500">{job.company}</p>
                <p className="text-sm text-gray-400 mt-1">
                    Status: <span className="font-medium text-blue-600">{job.status}</span>
                </p>
                <p className="text-xs text-gray-400">Date: {new Date(job.date).toLocaleDateString()}</p>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => onEdit(job)}
                    className="px-4 py-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg transition"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(job._id)}
                    className="px-4 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
