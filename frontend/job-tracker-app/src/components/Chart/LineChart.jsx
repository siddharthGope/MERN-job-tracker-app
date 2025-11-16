import React, { useEffect } from 'react'
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
import { Line } from 'react-chartjs-2';
import { useDispatch } from 'react-redux';
import { getJobs } from '../../features/jobs/JobSlice';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Legend);


// Custom plugin for line shadow
const lineShadowPlugin = {
    id: "lineShadow",
    beforeDatasetsDraw(chart) {
        const { ctx } = chart;
        ctx.save();
        ctx.shadowColor = "#4e46e56d";
        ctx.background = "linear-gradient(to bottom, #4e46e5eb, #fff)";
        ctx.shadowBlur = 12;
        ctx.shadowOffsetY = 4;
    },
    afterDatasetsDraw(chart) {
        chart.ctx.restore();
    }
};

const LineChart = ({ dLabels, dates }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getJobs())
    }, [dispatch]);

    return (
        <div className="chart-card">
            <h3 className="text-center md:text-left text-sm font-semibold mb-2 text-black">Applications Over Time</h3>

            <Line
                data={{
                    labels: dLabels,
                    datasets: [
                        {
                            label: "Applications",
                            data: dates,
                            // borderColor: "#10b981",
                            // backgroundColor: "#10b98133",

                            borderColor: "#4F46E5",
                            backgroundColor: "rgba(79, 70, 229, 0.2)",
                            tension: 0.4,
                            pointBackgroundColor: "#4F46E5",
                            pointBorderColor: "#fff",
                            pointHoverRadius: 6,
                            pointHoverBackgroundColor: "#fff",
                            pointHoverBorderColor: "#4F46E5",
                        }
                    ],
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                labels: {
                                    color: "#333",
                                    font: { size: 14, family: "Poppins" }
                                }
                            },
                            tooltip: {
                                backgroundColor: "#4F46E5",
                                titleColor: "#fff",
                                bodyColor: "#fff",
                                padding: 10,
                                borderWidth: 1,
                                borderColor: "#fff",
                            }
                        },
                        scales: {
                            x: {
                                grid: { color: "rgba(0,0,0,0.05)" },
                                ticks: { color: "#555" }
                            },
                            y: {
                                grid: { color: "rgba(0,0,0,0.05)" },
                                ticks: { color: "#555" }
                            }
                        }
                    }

                }}
                plugins={[lineShadowPlugin]}
            />
        </div>
    )
}

export default LineChart