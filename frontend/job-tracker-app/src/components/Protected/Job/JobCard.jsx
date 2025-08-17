import { useTheme } from "../../../context/ThemeContext";

// JobCard.jsx
export default function JobCard({ job, onEdit, onDelete }) {

    const { theme } = useTheme()
    return (
        <div className={(theme === "dark" ? 'bg-[#474646] text-white' : 'bg-white text-black')}>
            <div className="bg-[#e1e1e1] shadow-md rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between transition hover:shadow-lg border border-gray-300 m-3">
                <div className="mb-4 sm:mb-0 flex items-center">

                    <p>💼</p>
                    <div className="ml-2">
                        <div className="flex items-center">
                            <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
                            <p className="text-sm text-gray-400 ml-2 bg-[#4f46e547] p-1 rounded">
                                <span className="font-medium text-blue-600">{job.status}</span>
                            </p>
                        </div>

                        <div className="flex items-center">
                            <p className="text-sm text-gray-500">{job.company}</p>

                            <p className="text-xs text-gray-400 ml-2">Date: {new Date(job.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(job)}
                        className="px-4 py-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg transition"
                    >
                        ✏
                    </button>
                    <button
                        onClick={() => onDelete(job._id)}
                        className="px-4 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                    >
                        🗑
                    </button>
                </div>
            </div>
        </div>
    );
}
