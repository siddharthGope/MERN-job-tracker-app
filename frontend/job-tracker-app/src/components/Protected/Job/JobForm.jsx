import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { createJob, updateJob } from '../../../features/jobs/JobSlice';
import Right from '../../../assets/right-arrow-icon.png';


function JobForm({ editJob, onComplete, onModalClose }) {

    const [form, setForm] = useState(editJob || { title: '', company: '', status: 'applied', date: '', notes: '' });

    const dispatch = useDispatch()

    useEffect(() => {
        if (editJob) {
            setForm({
                title: editJob.title || '',
                company: editJob.company || '',
                status: editJob.status || 'applied',
                date: editJob.date || '',
                notes: editJob.notes || ''
            })
        }

    }, [editJob]);


    const handleSubmit = (e) => {
        e.preventDefault()
        if (editJob) {

            dispatch(updateJob({ id: editJob._id, ...form }))
            setForm({ title: '', company: '', status: 'applied', date: '', notes: '' })
            onModalClose()
        }
        else {
            dispatch(createJob(form))
            setForm({ title: '', company: '', status: 'applied', date: '', notes: '' })
            onModalClose()
        }

        onComplete?.()
    }


    return (
        <div>

            <form onSubmit={handleSubmit} className="card bg-white shadow-md space-y-4 max-w-xl mx-auto">
                {/* Title */}
                <h2 className="text-2xl font-semibold text-[#4f46e5] mb-4 mt-4 text-center text-bold">
                    {editJob ? "Edit Job" : "Add Job"}
                </h2>
                <div>
                    <label className="block mb-1 text-sm text-gray-600 text-bold">Job Title</label>
                    <input type="text" placeholder="e.g. Frontend Developer"
                        className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                </div>


                {/* Company */}
                <div>
                    <label className="block mb-1 text-sm text-gray-600 text-bold">Company</label>
                    <input type="text" placeholder="e.g. Flipkart"
                        className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                </div>

                {/* Date */}
                <div>
                    <label className="block mb-1 text-sm text-gray-600 text-bold">Application Date</label>
                    <input type="date" placeholder='Date' value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                {/* Notes */}
                <div>
                    <label className="block mb-1 text-sm text-gray-600 text-bold">Notes</label>
                    <textarea type="text" placeholder='Add additional notes' value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                </div>

                {/* Status */}
                <div>
                    <select value={form.status} onChange={e => { setForm({ ...form, status: e.target.value }) }} className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value='applied'> <span className='selections'>Applied</span> </option>
                        <option value='interviewed'> <span className='selections'>Interviewed</span> </option>
                        <option value='offer'> <span className='selections'>Offer</span> </option>
                        <option value='rejected'> <span className='selections'>Rejected</span> </option>
                    </select>
                </div>
                <button type='submit' className='submit-btn bg-[#4f46e5]'> <span>{editJob ? 'Update' : 'Create'}</span> <img src={Right} alt="" className='right-arr ml-2' /> </button>

            </form>
        </div>
    )
}

export default JobForm