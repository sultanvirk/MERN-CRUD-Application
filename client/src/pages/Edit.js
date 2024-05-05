import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function Edit() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [input, setInput] = useState({
        name: '',
        email: '',
        age: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };


    useEffect(() => {
        const getUserData = async () => {
            const response = await axios.get(`http://localhost:8000/api/v1/getsingleuser/${id}`)
            setInput(response.data)
        }
        getUserData();
    }, [])


    const handleUpdate = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8000/api/v1/updateuser/${id}`, input)
        navigate('/');
    }


    return (
        <div className='container mx-auto'>
            <div className="x-auto mt-5 p-6 mt-28 rounded-xl shadow-xl">
                <h2 className="text-2xl font-bold mb-4">Edit Information</h2>
                <form onSubmit={handleUpdate}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={input.name}
                            onChange={(e) => {
                                setInput({ ...input, [e.target.name]: e.target.value })
                            }}
                            className="w-full px-3 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={input.email}
                            onChange={(e) => {
                                setInput({ ...input, [e.target.name]: e.target.value })
                            }}
                            className="w-full px-3 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="age" className="block text-gray-700 font-bold mb-2">
                            Age
                        </label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={input.age}
                            onChange={(e) => {
                                setInput({ ...input, [e.target.name]: e.target.value })
                            }}
                            className="w-full px-3 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your age"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>

    )
}

export default Edit
