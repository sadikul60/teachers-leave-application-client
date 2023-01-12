import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../ContextApi/AuthProvider/AuthProvider';
import Spinner from '../../Components/Spinner/Spinner'
import { serverApi } from '../../ServerApi/ServerApi';

const LeavesForm = () => {
    const { user, loading } = useContext(AuthContext);
    // const [userInfo, setUserInfo] = useState(null);
    console.log(user);
    const { register, handleSubmit, formState: { errors } } = useForm();


    const { data: userInfo = [], isLoading, refetch } = useQuery({
        queryKey: ['userInfo'],
        queryFn: async () => {
            const res = await fetch(`${serverApi}/userInfo?email=${user.email}`);
            const data = await res.json();
            return data;
        }
    });
    if (user?.email) {
        refetch()
    }

    if (loading || isLoading) {
        return <Spinner />
    }
    console.log(userInfo);


    const handleSave = data => {

        const department = data.department;
        const name = data.name;
        const shift = data.shift;
        const leaves = data.leaves;
        const title = data.title;
        const startDate = data.startDate;
        const endDate = data.endDate;
        const totalDays = data.totalDays;
        const description = data.description;


        const leavesInfo = {
            name,
            department,
            shift,
            leaves,
            title,
            startDate,
            endDate,
            totalDays,
            description
        }

        console.log(leavesInfo);
    }
    return (
        <div className='container mx-auto'>
            <div className="bg-slate-300 py-8 rounded-lg">
                <div className=" flex-col">
                    <form onSubmit={handleSubmit(handleSave)} className="card w-full">
                        <div className='w-11/12 mx-auto'>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                                <div className='bg-gray-500 p-3 shadow-2xl rounded-lg text-center'>
                                    <h1 className='text-white text-2xl'>Total Leaves <br /> <span className='text-3xl font-bold'>12</span></h1>
                                </div>
                                <div className='bg-primary p-3 shadow-2xl rounded-lg text-center'>
                                    <h1 className='text-white text-2xl'>Due Leave(s) <br /> <span className='text-3xl font-bold'>7</span></h1>
                                </div>
                                <div className='bg-gray-500 p-3 shadow-2xl rounded-lg text-center'>
                                    <h1 className='text-white text-2xl'>Spend Leave(s) <br /> <span className='text-3xl font-bold'>5</span></h1>
                                </div>
                            </div>
                        </div>
                        <div className="card-body grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full name</span>
                                </label>
                                <input defaultValue={userInfo?.details?.name} readOnly type="text" {...register("name", { required: "name is required" })} className="bg-gray-100 input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Department</span>
                                </label>
                                <input defaultValue={userInfo?.department} readOnly type="text" {...register("department", { required: "department is required" })} className="bg-gray-100 input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Shift</span>
                                </label>
                                <input defaultValue={userInfo?.shift} readOnly type="text" {...register("shift", { required: "shift is required" })} className="bg-gray-100 input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Leaves category</span>
                                </label>
                                <select name='leaves' {...register("leaves", { required: "leaves is required" })} className="bg-gray-100 select select-bordered w-full">
                                    <option>Casual Leave</option>
                                    <option>Sich Leave</option>
                                    <option>Festival Holiday</option>
                                    <option>Weekly Holiday</option>
                                </select>
                                {errors.leaves && <p role="alert" className='text-red-600'>{errors.leaves?.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input defaultValue={userInfo?.title} readOnly type="text" {...register("title", { required: "title is required" })} className="bg-gray-100 input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Start date<span className='text-red-600'>*</span></span>
                                </label>
                                <input type="date" {...register("startDate", { required: "Start date is required" })} placeholder="Your Birthday" className="bg-gray-100 input input-bordered" />
                                {errors.startDate && <p role="alert" className='text-red-600'>{errors.startDate?.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">End date<span className='text-red-600'>*</span></span>
                                </label>
                                <input type="date" {...register("endDate", { required: "End date is required" })} placeholder="Your Birthday" className="bg-gray-100 input input-bordered" />
                                {errors.endDate && <p role="alert" className='text-red-600'>{errors.endDate?.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">No. of days leaves required<span className='text-red-600'>*</span></span>
                                </label>
                                <input type="number" {...register("totalDays", { required: "Total days is required" })} placeholder="Enter no. of leaves" className="bg-gray-100 input input-bordered" />
                                {errors.totalDays && <p role="alert" className='text-red-600'>{errors.totalDays?.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Reason for Leave<span className='text-red-600'>*</span></span>
                                </label>
                                <textarea {...register("description", { required: "Reason for leave is required" })} className="textarea bg-gray-100 input-bordered" placeholder="Description"></textarea>
                                {errors.description && <p role="alert" className='text-red-600'>{errors.description?.message}</p>}
                            </div>
                            <div className="form-control mt-4">
                                <button type='submit' className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LeavesForm;