import React, { useState } from 'react'
import JobForm from './JobForm'
import Loading from '../../Chart/Loading'
import { useSelector } from 'react-redux'


function AddJob() {

    const { loading } = useSelector(state => state.jobs)
    const [editing, setEditing] = useState(null)

    if (loading) return (<Loading />)
    return (
        <>
            <JobForm onComplete={() => setEditing(null)} editJob={editing} />
        </>
    )
}

export default AddJob