import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteJob, getJobs } from '../../../features/jobs/JobSlice'
import JobForm from './JobForm'
import JobCard from './JobCard'
import Loading from '../../Chart/Loading'


function JobList() {

    const { jobs, loading } = useSelector(state => state.jobs)
    const dispatch = useDispatch()
    const [editing, setEditing] = useState(null)


    useEffect(() => {
        dispatch(getJobs())
    }, [dispatch]);


    const handleDelete = (id) => {
        dispatch(deleteJob(id))
    }

    if (loading) return (<Loading />)

    return (
        <div>

            <JobForm onComplete={() => setEditing(null)} editJob={editing} />

            <ul>
                <h2 className='text-xl font-semibold text-gray-800 mb-4 mt-4 text-center'>Job Applications</h2>
                {jobs && jobs.length > 0 && jobs.map(job => (
                    <JobCard key={job._id} job={job} onEdit={(job) => setEditing(job)} onDelete={(id) => handleDelete(id)} />

                ))}
            </ul>
        </div>
    )
}

export default JobList