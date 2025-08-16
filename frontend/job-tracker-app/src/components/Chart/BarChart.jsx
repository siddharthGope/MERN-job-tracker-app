import React from 'react'
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
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Legend);


function BarChart({ statuses, sLabels }) {
    return (
        <div className="chart-card">
            <h2 className="text-center md:text-left text-xl font-semibold mb-2">Applications by Status</h2>

            <Bar data={{
                labels: sLabels,
                datasets: [
                    {
                        label: ["Interviewed"],
                        data: statuses,
                        // backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],

                        backgroundColor: ['#3b82f6', '#10b981', '#ef4444', '#f0b100'],
                        borderColor: ['#3b82f6', '#46e556a8', '#ef4444', '#f0b00078'],
                        borderWidth: 1,
                        borderRadius: 5,
                        barThickness: 20
                    }
                ]
            }} />
        </div>
    )
}

export default BarChart