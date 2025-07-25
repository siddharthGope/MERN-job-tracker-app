import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { getJobs, selectJobsByDate, selectJobsByStatus } from '../../features/jobs/jobSlice';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Legend);

function Dashboard() {
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getJobs())
    }, [dispatch]);


    const jobsByStatus = useSelector(selectJobsByStatus)
    const jobsByDate = useSelector(selectJobsByDate)


    const statusLabels = Object.keys(jobsByStatus)
    const statusData = Object.values(jobsByStatus)

    const dateLabels = Object.keys(jobsByDate).sort()
    const dateData = dateLabels.map((date) => jobsByDate[date])


    return (
        <div className="grid md:grid-cols-2 gap-8 mt-8">
            {/* Pie Chart – Status */}
            <div className="bg-white p-4 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-2">Status Distribution</h2>

                <Pie
                    data={{
                        labels: statusLabels,
                        datasets: [
                            {
                                label: "Applications",
                                data: statusData,
                                backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
                            }
                        ]
                    }}
                />
            </div>
            {/* Bar Chart – Status Count */}

            <div className="bg-white p-4 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-2">Applications by Status</h2>

                <Bar data={{
                    labels: statusLabels,
                    datasets: [
                        {
                            label: "Count",
                            data: statusData,
                            backgroundColor: "#3b82f6",
                        }
                    ]
                }} />
            </div>

            {/* Line Chart – Over Time */}

            <div className="col-span-2 bg-white p-4 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-2">Applications Over Time</h2>

                <Line
                    data={{
                        labels: dateLabels,
                        datasets: [
                            {
                                label: "Applications",
                                data: dateData,
                                borderColor: "#10b981",
                                backgroundColor: "#10b98133",
                            }
                        ]
                    }}
                />
            </div>

        </div>
    )
}

export default Dashboard