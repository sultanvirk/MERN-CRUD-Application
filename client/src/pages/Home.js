import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

function Home() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: ''
    });
    const [render, setRender] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        const userCreated = await axios.post('http://localhost:8000/api/v1/createuser', formData)

        setRender(!render)
        setFormData({
            name: '',
            email: '',
            age: ''
        })

    };


    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUserData = async () => {
            const response = await axios.get('http://localhost:8000/api/v1/users')
            setUsers(response.data)
        }
        getUserData();
    }, [render])



    // delete user

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/api/v1/deleteuser/${id}`)
        setRender(!render)
        // const newUsers = users.filter((item) => {
        //     return item._id === id
        // })
        // setUsers(newUsers)
    }



    return (
        <>
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold mt-32 text-center bg-blue-500 text-white py-8 rounded-xl">
                    MERN CRUD Application
                </h1>

                <div className="md:flex gap-4 my-12">
                    <div className="overflow-x-auto w-1/2 rounded-xl shadow-xl">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="bg-gray-100 text-gray-600 text-left">
                                    {/* <th className="py-2 px-4">ID</th> */}
                                    <th className="py-2 px-4">Name</th>
                                    <th className="py-2 px-4">Email</th>
                                    <th className="py-2 px-4">Age</th>
                                    <th className="py-2 px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(item => (
                                    <tr key={item.id} className="border-b border-gray-200">
                                        {/* <td className="py-2 px-4">{item._id}</td> */}
                                        <td className="py-2 px-4">{item.name}</td>
                                        <td className="py-2 px-4">{item.email}</td>
                                        <td className="py-2 px-4">{item.age}</td>
                                        <td className="py-2 px-4">
                                            <Link to={`/edit/${item._id}`}>
                                                <button
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"

                                                >
                                                    Update
                                                </button>
                                            </Link>
                                            <button
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                                onClick={() => handleDelete(item._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>


                    <div className="x-auto mt-5 p-6  w-1/2 rounded-xl shadow-xl">
                        <h2 className="text-2xl font-bold mb-4">User Information</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
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
                                    value={formData.email}
                                    onChange={handleChange}
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
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter your age"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
