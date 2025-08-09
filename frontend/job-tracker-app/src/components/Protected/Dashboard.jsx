import React, { useEffect } from 'react'
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
import { getJobs, selectJobsByDate, selectJobsByStatus } from '../../features/jobs/JobSlice';
import LineChart from '../Chart/LineChart';
import BarChart from '../Chart/BarChart';
import Loading from '../Chart/Loading';


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
        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 mt-8">
            {/* Pie Chart – Status */}
            {/* <div className="bg-white p-4 rounded-xl shadow">
                <h2 className="text-center md:text-left text-xl font-semibold mb-2">Status Distribution</h2>

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
            </div> */}
            {/* Bar Chart – Status Count */}

            {
                statusData.length > 0 && statusLabels.length > 0 ? (<BarChart statuses={statusData} sLabels={statusLabels} />) : (<Loading />)
            }

            {/* Line Chart – Over Time */}

            {
                dateLabels.length > 0 && dateData.length > 0 ? (<LineChart dLabels={dateLabels} dates={dateData} />) : (<Loading />)
            }
        </div>
    )
}

export default Dashboard