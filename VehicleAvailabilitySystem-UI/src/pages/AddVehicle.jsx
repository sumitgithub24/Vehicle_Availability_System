// "use client";

// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addNewVehicle } from "../store/vehicleSlice";
// import Navbar from "../components/Navbar";
// import axios from "axios";

// const AddVehicle = () => {
//     const [formData, setFormData] = useState({
//         name: "",
//         model: "",
//         price: "",
//         description: "",
//         status: "Available",
//         imageUrl: "",
//     });
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");
//         setLoading(true);

//         try {
//             // Convert price to number
//             /* const vehicleData = {
//                 ...formData,
//                 price: Number.parseFloat(formData.price),
//             };
//  */
//             const form = new FormData();
//             form.append("name", formData.name);
//             form.append("model", formData.model);
//             form.append("price", formData.price);
//             form.append("description", formData.description);
//             form.append("status", formData.status);
//             const response = await axios.post(
//                 "http://localhost:8080/VehicleAvaibilitySystem-1.0-SNAPSHOT/addVehicle",
//                 new URLSearchParams(form),
//                 {
//                     withCredentials: true,
//                     headers: {
//                         "Content-Type": "application/x-www-form-urlencoded", // or omit this, Axios sets it automatically for FormData
//                     },
//                 }
//             );

//             dispatch(addNewVehicle(response.data));
//             navigate("/vehicles");
//         } catch (err) {
//             console.error("Error adding vehicle:", err);
//             setError("Failed to add vehicle. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-100">
//             <Navbar />

//             <div className="container mx-auto px-4 py-8">
//                 <Link
//                     to="/vehicles"
//                     className="text-green-600 hover:text-green-700 font-medium inline-block mb-6"
//                 >
//                     &larr; Back to Vehicles
//                 </Link>

//                 <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
//                     <h1 className="text-2xl font-bold text-gray-800 mb-6">
//                         Add New Vehicle
//                     </h1>

//                     {error && (
//                         <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
//                             <p className="text-red-700">{error}</p>
//                         </div>
//                     )}

//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                             <div>
//                                 <label
//                                     htmlFor="name"
//                                     className="block text-sm font-medium text-gray-700 mb-1"
//                                 >
//                                     Vehicle Name
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="name"
//                                     name="name"
//                                     value={formData.name}
//                                     onChange={handleChange}
//                                     required
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
//                                 />
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="model"
//                                     className="block text-sm font-medium text-gray-700 mb-1"
//                                 >
//                                     Model
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="model"
//                                     name="model"
//                                     value={formData.model}
//                                     onChange={handleChange}
//                                     required
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
//                                 />
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                             <div>
//                                 <label
//                                     htmlFor="price"
//                                     className="block text-sm font-medium text-gray-700 mb-1"
//                                 >
//                                     Price ($)
//                                 </label>
//                                 <input
//                                     type="number"
//                                     id="price"
//                                     name="price"
//                                     value={formData.price}
//                                     onChange={handleChange}
//                                     required
//                                     min="0"
//                                     step="0.01"
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
//                                 />
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="status"
//                                     className="block text-sm font-medium text-gray-700 mb-1"
//                                 >
//                                     Status
//                                 </label>
//                                 <select
//                                     id="status"
//                                     name="status"
//                                     value={formData.status}
//                                     onChange={handleChange}
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
//                                 >
//                                     <option value="Available">Available</option>
//                                     <option value="Reserved">Reserved</option>
//                                     <option value="Sold">Sold</option>
//                                     <option value="Maintenance">
//                                         Maintenance
//                                     </option>
//                                 </select>
//                             </div>
//                         </div>

//                         <div>
//                             <label
//                                 htmlFor="imageUrl"
//                                 className="block text-sm font-medium text-gray-700 mb-1"
//                             >
//                                 Image URL (optional)
//                             </label>
//                             <input
//                                 type="url"
//                                 id="imageUrl"
//                                 name="imageUrl"
//                                 value={formData.imageUrl}
//                                 onChange={handleChange}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
//                                 placeholder="https://example.com/image.jpg"
//                             />
//                         </div>

//                         <div>
//                             <label
//                                 htmlFor="description"
//                                 className="block text-sm font-medium text-gray-700 mb-1"
//                             >
//                                 Description
//                             </label>
//                             <textarea
//                                 id="description"
//                                 name="description"
//                                 value={formData.description}
//                                 onChange={handleChange}
//                                 required
//                                 rows="4"
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
//                             ></textarea>
//                         </div>

//                         <div className="flex justify-end space-x-4">
//                             <Link
//                                 to="/vehicles"
//                                 className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//                             >
//                                 Cancel
//                             </Link>
//                             <button
//                                 type="submit"
//                                 disabled={loading}
//                                 className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
//                             >
//                                 {loading ? "Adding..." : "Add Vehicle"}
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddVehicle;

"use client";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNewVehicle } from "../store/vehicleSlice";
import Navbar from "../components/Navbar";
import axios from "axios";

const AddVehicle = () => {
    const [formData, setFormData] = useState({
        name: "",
        model: "",
        price: "",
        description: "",
        status: "Available",
        imageUrl: "",
        color: "",
        mileage: "",
        year: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const form = new FormData();
            /*   Object.entries(formData).forEach(([key, value]) => {
                if (key === "imageUrl" && !value.trim()) return; // Skip empty imageUrl
                form.append(key, value);
            }); */
            form.append("name", formData.name);
            form.append("model", formData.model);
            form.append("price", formData.price);
            form.append("description", formData.description);
            form.append("status", formData.status);
            form.append("color", formData.color);
            form.append("mileage", formData.mileage);
            form.append("year", formData.year);
            form.append(
                "imageUrl",
                formData.imageUrl ||
                    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            );

            const response = await axios.post(
                "http://localhost:8080/VehicleAvaibilitySystem-1.0-SNAPSHOT/addVehicle",
                new URLSearchParams(form),
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );
            console.log(
                "Vehicle added successfully and Details of the Vehicle is -> :",
                response.data
            );
            dispatch(addNewVehicle(response.data));
            navigate("/vehicles");
        } catch (err) {
            console.error("Error adding vehicle:", err);
            setError("Failed to add vehicle. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <Navbar />

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <Link
                    to="/vehicles"
                    className="inline-flex items-center text-green-600 hover:text-green-700 font-medium mb-6 transition-colors duration-200"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Back to Vehicles
                </Link>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-8">
                    <div className="flex items-center mb-8">
                        <div className="bg-green-100 p-3 rounded-full mr-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-green-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Add New Vehicle
                        </h1>
                    </div>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
                            <div className="flex">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-red-500 mr-2"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <p className="text-red-700">{error}</p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Vehicle Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900"
                                    placeholder="Enter vehicle name"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="model"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Model
                                </label>
                                <input
                                    type="text"
                                    id="model"
                                    name="model"
                                    value={formData.model}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900"
                                    placeholder="Enter model"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="price"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Price ($)
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm">
                                            $
                                        </span>
                                    </div>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        step="0.01"
                                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900"
                                        placeholder="Enter price"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="status"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Status
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900"
                                >
                                    <option value="Available">Available</option>
                                    <option value="Reserved">Reserved</option>
                                    <option value="Sold">Sold</option>
                                    <option value="Maintenance">
                                        Maintenance
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div>
                                <label
                                    htmlFor="color"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Color
                                </label>
                                <input
                                    type="text"
                                    id="color"
                                    name="color"
                                    value={formData.color}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900"
                                    placeholder="Enter color"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="year"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Year
                                </label>
                                <input
                                    type="number"
                                    id="year"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900"
                                    placeholder="Enter year"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="mileage"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Mileage (km)
                                </label>
                                <input
                                    type="number"
                                    id="mileage"
                                    name="mileage"
                                    value={formData.mileage}
                                    onChange={handleChange}
                                    required
                                    step="0.01"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900"
                                    placeholder="Enter mileage"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="imageUrl"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Image URL (optional)
                            </label>
                            <input
                                type="url"
                                id="imageUrl"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900"
                                placeholder="Enter image URL"
                            />
                            {formData.imageUrl && (
                                <div className="mt-2 p-2 border border-gray-200 rounded-lg bg-gray-50 inline-block">
                                    <img
                                        src={
                                            formData.imageUrl ||
                                            "/placeholder.svg"
                                        }
                                        alt="Vehicle preview"
                                        className="h-20 w-auto object-cover rounded"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                                "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="5"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900 resize-none"
                                placeholder="Enter vehicle description"
                            />
                        </div>

                        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
                            <Link
                                to="/vehicles"
                                className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                            >
                                {loading ? (
                                    <>
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Adding...
                                    </>
                                ) : (
                                    <>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 mr-2"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Add Vehicle
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddVehicle;
