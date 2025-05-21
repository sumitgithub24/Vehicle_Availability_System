// "use client";

// import { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//     setCurrentVehicle,
//     updateExistingVehicle,
// } from "../store/vehicleSlice";
// import Navbar from "../components/Navbar";
// import axios from "axios";

// const EditVehicle = () => {
//     const { id } = useParams();
//     const [formData, setFormData] = useState({
//         name: "",
//         model: "",
//         price: "",
//         description: "",
//         status: "Available",
//         imageUrl: "",
//     });
//     const [loading, setLoading] = useState(true);
//     const [saving, setSaving] = useState(false);
//     const [error, setError] = useState("");

//     const { currentVehicle } = useSelector((state) => state.vehicles);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     // Fetch vehicle details
//     useEffect(() => {
//         const fetchVehicleDetails = async () => {
//             try {
//                 const response = await axios.get(
//                     `http://localhost:8080/VehicleAvaibilitySystem-1.0-SNAPSHOT/vehicleById?id=${id}`,
//                     { withCredentials: true }
//                 );
//                 dispatch(setCurrentVehicle(response.data));
//                 setLoading(false);
//             } catch (err) {
//                 console.error("Error fetching vehicle details:", err);
//                 setError(
//                     "Failed to load vehicle details. Please try again later."
//                 );
//                 setLoading(false);
//             }
//         };

//         fetchVehicleDetails();
//     }, [dispatch, id]);

//     // Update form when vehicle data is loaded
//     useEffect(() => {
//         if (currentVehicle) {
//             setFormData({
//                 name: currentVehicle.name || "",
//                 model: currentVehicle.model || "",
//                 price: currentVehicle.price?.toString() || "",
//                 description: currentVehicle.description || "",
//                 status: currentVehicle.status || "Available",
//                 imageUrl: currentVehicle.imageUrl || "",
//             });
//         }
//     }, [currentVehicle]);

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
//         setSaving(true);

//         // try {
//         //     // Convert price to number
//         //     const vehicleData = {
//         //         ...formData,
//         //         price: Number.parseFloat(formData.price),
//         //     };

//         //     const response = await axios.post(
//         //         `http://localhost:8080/VehicleAvaibilitySystem-1.0-SNAPSHOT/editVehicle?id=${id}`,
//         //         vehicleData,
//         //         { withCredentials: true }
//         //     );

//         //     dispatch(updateExistingVehicle(response.data));
//         //     navigate(`/vehicles/${id}`);
//         // } catch (err) {
//         //     console.error("Error updating vehicle:", err);
//         //     setError("Failed to update vehicle. Please try again.");
//         // } finally {
//         //     setSaving(false);
//         // }
//         try {
//             const form = new FormData();
//             form.append("name", formData.name);
//             form.append("model", formData.model);
//             form.append("price", formData.price);
//             form.append("description", formData.description);
//             form.append("status", formData.status);
//             // form.append("imageUrl", formData.imageUrl);

//             const response = await axios.post(
//                 `http://localhost:8080/VehicleAvaibilitySystem-1.0-SNAPSHOT/editVehicle?id=${id}`,
//                 new URLSearchParams(form),
//                 {
//                     withCredentials: true,
//                     headers: {
//                         "Content-Type": "application/x-www-form-urlencoded", // or omit this, Axios sets it automatically for FormData
//                     },
//                 }
//             );

//             dispatch(updateExistingVehicle(response.data));
//             navigate(`/vehicles/${id}`);
//         } catch (err) {
//             console.error("Error updating vehicle:", err);
//             setError("Failed to update vehicle. Please try again.");
//         } finally {
//             setSaving(false);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gray-100">
//                 <Navbar />
//                 <div className="container mx-auto px-4 py-8">
//                     <div className="flex justify-center items-center h-64">
//                         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-100">
//             <Navbar />

//             <div className="container mx-auto px-4 py-8">
//                 <Link
//                     to={`/vehicles/${id}`}
//                     className="text-green-600 hover:text-green-700 font-medium inline-block mb-6"
//                 >
//                     &larr; Back to Vehicle Details
//                 </Link>

//                 <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
//                     <h1 className="text-2xl font-bold text-gray-800 mb-6">
//                         Edit Vehicle
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
//                                 to={`/vehicles/${id}`}
//                                 className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//                             >
//                                 Cancel
//                             </Link>
//                             <button
//                                 type="submit"
//                                 disabled={saving}
//                                 className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
//                             >
//                                 {saving ? "Saving..." : "Save Changes"}
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EditVehicle;

"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    setCurrentVehicle,
    updateExistingVehicle,
} from "../store/vehicleSlice";
import Navbar from "../components/Navbar";
import axios from "axios";

const inputClass =
    "w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900";
const labelClass = "block text-sm font-medium text-gray-700 mb-1";
const buttonPrimaryClass =
    "inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200";
const buttonOutlineClass =
    "inline-flex justify-center items-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200";

const EditVehicle = () => {
    const { id } = useParams();
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
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const { currentVehicle } = useSelector((state) => state.vehicles);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVehicleDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/VehicleAvaibilitySystem-1.0-SNAPSHOT/vehicleById?id=${id}`,
                    { withCredentials: true }
                );
                dispatch(setCurrentVehicle(response.data));
                setLoading(false);
            } catch (err) {
                console.error("Error fetching vehicle details:", err);
                setError(
                    "Failed to load vehicle details. Please try again later."
                );
                setLoading(false);
            }
        };

        fetchVehicleDetails();
    }, [dispatch, id]);

    useEffect(() => {
        if (currentVehicle) {
            setFormData({
                name: currentVehicle.name || "",
                model: currentVehicle.model || "",
                price: currentVehicle.price?.toString() || "",
                description: currentVehicle.description || "",
                status: currentVehicle.status || "Available",
                imageUrl:
                    currentVehicle.imageUrl ||
                    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                color: currentVehicle.color || "",
                mileage: currentVehicle.mileage?.toString() || "",
                year: currentVehicle.year?.toString() || "",
            });
        }
    }, [currentVehicle]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        /* e.preventDefault();
        setError("");
        setSaving(true); */

        /*    try {
            const form = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                form.append(key, value);
            });

            const response = await axios.post(
                `http://localhost:8080/VehicleAvaibilitySystem-1.0-SNAPSHOT/editVehicle?id=${id}`,
                new URLSearchParams(form),
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            dispatch(updateExistingVehicle(response.data));
            navigate(`/vehicles/${id}`);
        } catch (err) {
            console.error("Error updating vehicle:", err);
            setError("Failed to update vehicle. Please try again.");
        } finally {
            setSaving(false);
        } */
        e.preventDefault();
        setError("");
        setSaving(true);

        const DEFAULT_IMAGE_URL =
            "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";

        try {
            const form = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                // Apply default only for imageUrl if it's empty or just spaces
                if (key === "imageUrl" && (!value || value.trim() === "")) {
                    form.append(key, DEFAULT_IMAGE_URL);
                } else {
                    form.append(key, value);
                }
            });

            const response = await axios.post(
                `http://localhost:8080/VehicleAvaibilitySystem-1.0-SNAPSHOT/editVehicle?id=${id}`,
                new URLSearchParams(form),
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            dispatch(updateExistingVehicle(response.data));
            navigate(`/vehicles/${id}`);
        } catch (err) {
            console.error("Error updating vehicle:", err);
            setError("Failed to update vehicle. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100">
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <Navbar />

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <Link
                    to={`/vehicles/${id}`}
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
                    Back to Vehicle Details
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
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Edit Vehicle Details
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
                                <label htmlFor="name" className={labelClass}>
                                    Vehicle Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className={inputClass}
                                    placeholder="Enter vehicle name"
                                />
                            </div>

                            <div>
                                <label htmlFor="model" className={labelClass}>
                                    Model
                                </label>
                                <input
                                    type="text"
                                    id="model"
                                    name="model"
                                    value={formData.model}
                                    onChange={handleChange}
                                    required
                                    className={inputClass}
                                    placeholder="Enter model"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="price" className={labelClass}>
                                    Price ($)
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    step="0.01"
                                    className={inputClass}
                                    placeholder="Enter price"
                                />
                            </div>

                            <div>
                                <label htmlFor="status" className={labelClass}>
                                    Status
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className={inputClass}
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
                                <label htmlFor="color" className={labelClass}>
                                    Color
                                </label>
                                <input
                                    type="text"
                                    id="color"
                                    name="color"
                                    value={formData.color}
                                    onChange={handleChange}
                                    required
                                    className={inputClass}
                                    placeholder="Enter color"
                                />
                            </div>

                            <div>
                                <label htmlFor="year" className={labelClass}>
                                    Year
                                </label>
                                <input
                                    type="number"
                                    id="year"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                    required
                                    className={inputClass}
                                    placeholder="Enter year"
                                />
                            </div>

                            <div>
                                <label htmlFor="mileage" className={labelClass}>
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
                                    className={inputClass}
                                    placeholder="Enter mileage"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="imageUrl" className={labelClass}>
                                Image URL
                            </label>
                            <input
                                type="url"
                                id="imageUrl"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="Enter image URL"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className={labelClass}>
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="5"
                                required
                                className={`${inputClass} resize-none`}
                                placeholder="Enter vehicle description"
                            />
                        </div>

                        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
                            <Link
                                to={`/vehicles/${id}`}
                                className={buttonOutlineClass}
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={saving}
                                className={buttonPrimaryClass}
                            >
                                {saving ? (
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
                                        Saving...
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
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Save Changes
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

// Tailwind helpers for inputs and buttons (optional)

export default EditVehicle;
