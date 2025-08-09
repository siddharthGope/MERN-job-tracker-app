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

// Custom plugin for line shadow
// const lineShadowPlugin = {
//     id: "lineShadow",
//     beforeDatasetsDraw(chart) {
//         const { ctx } = chart;
//         ctx.save();
//         ctx.shadowColor = "#4e46e56d";
//         ctx.background = "linear-gradient(to bottom, #4e46e5eb, #fff)";
//         ctx.shadowBlur = 12;
//         ctx.shadowOffsetY = 4;
//     },
//     afterDatasetsDraw(chart) {
//         chart.ctx.restore();
//     }
// };

function BarChart({ statuses, sLabels }) {
    return (
        <div className="chart-card">
            <h2 className="text-center md:text-left text-xl font-semibold mb-2">Applications by Status</h2>

            <Bar data={{
                labels: sLabels,
                datasets: [
                    {
                        label: "Count",
                        data: statuses,
                        // backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],

                        backgroundColor: ['#4F46E5', '#46e556a8', '#4e46e551'],
                        borderColor: ['#4F46E5', '#46e556a8', '#4e46e551'],
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