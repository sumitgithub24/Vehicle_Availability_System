"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentVehicle, removeVehicle } from "../store/vehicleSlice";
import Navbar from "../components/Navbar";
import axios from "axios";

const VehicleDetail = () => {
    const { id } = useParams();
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { currentVehicle: vehicle } = useSelector((state) => state.vehicles);
    console.log("Details of the vehicle is :-> ", vehicle);
    const { isDealer } = useSelector((state) => state.auth);
    console.log("Is Dealer or not :-> ", isDealer);
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

    const handleDelete = async () => {
        try {
            await axios.post(
                `http://localhost:8080/VehicleAvaibilitySystem-1.0-SNAPSHOT/deleteVehicle?id=${id}`,
                {},
                { withCredentials: true }
            );
            dispatch(removeVehicle(id));
            navigate("/vehicles");
        } catch (err) {
            console.error("Error deleting vehicle:", err);
            setError("Failed to delete vehicle. Please try again later.");
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

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100">
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                        <p className="text-red-700">{error}</p>
                    </div>
                    <Link
                        to="/vehicles"
                        className="text-green-600 hover:text-green-700 font-medium"
                    >
                        &larr; Back to Vehicles
                    </Link>
                </div>
            </div>
        );
    }

    if (!vehicle) {
        return (
            <div className="min-h-screen bg-gray-100">
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center py-12">
                        <h3 className="text-xl font-medium text-gray-600">
                            Vehicle not found.
                        </h3>
                        <Link
                            to="/vehicles"
                            className="mt-4 inline-block text-green-600 hover:text-green-700 font-medium"
                        >
                            &larr; Back to Vehicles
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
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

                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                    <div className="md:flex">
                        <div className="md:w-1/2 relative">
                            {/* <img
                                src={
                                    vehicle.imageUrl ||
                                    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" ||
                                    "/placeholder.svg"
                                }
                                alt={vehicle.name}
                                className="w-full max-w-full h-48 md:h-64 lg:h-72 object-cover rounded-xl shadow-sm"
                            /> */}
                            <div className="aspect-[4/3] w-full max-h-[400px] overflow-hidden rounded-xl ">
                                <img
                                    src={
                                        vehicle.imageUrl ||
                                        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                    }
                                    alt={vehicle.name}
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>

                            <div className="absolute top-4 right-4">
                                <div
                                    className={`px-4 py-2 rounded-full text-sm font-semibold shadow-sm ${
                                        vehicle.status === "Available"
                                            ? "bg-green-100 text-green-800 border border-green-200"
                                            : vehicle.status === "Sold"
                                            ? "bg-red-100 text-red-800 border border-red-200"
                                            : vehicle.status === "Reserved"
                                            ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                                            : "bg-gray-100 text-gray-800 border border-gray-200"
                                    }`}
                                >
                                    {vehicle.status}
                                </div>
                            </div>
                        </div>
                        <div className="p-8 md:w-1/2">
                            <div className="flex flex-col">
                                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                                    {vehicle.name}
                                </h1>
                                <p className="text-gray-600 mb-4 text-lg">
                                    {vehicle.model} • {vehicle.year || "N/A"}
                                </p>
                            </div>

                            <div className="mt-6">
                                <h2 className="text-3xl font-bold text-green-600 mb-6">
                                    ${vehicle.price}
                                </h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">
                                            Description
                                        </h3>
                                        <p className="text-gray-700 leading-relaxed">
                                            {vehicle.description}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">
                                            Specifications
                                        </h3>
                                        <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                            <div>
                                                <p className="text-gray-500 text-sm">
                                                    Model
                                                </p>
                                                <p className="font-medium text-gray-900">
                                                    {vehicle.model}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-sm">
                                                    Year
                                                </p>
                                                <p className="font-medium text-gray-900">
                                                    {vehicle.year || "N/A"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-sm">
                                                    Color
                                                </p>
                                                <p className="font-medium text-gray-900">
                                                    {vehicle.color || "N/A"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-sm">
                                                    Mileage
                                                </p>
                                                <p className="font-medium text-gray-900">
                                                    {vehicle.mileage
                                                        ? `${vehicle.mileage} km`
                                                        : "N/A"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {isDealer && (
                                    <div className="mt-8 pt-6 border-t border-gray-200">
                                        <div className="flex flex-wrap gap-4">
                                            <Link
                                                to={`/edit-vehicle/${vehicle.id}`}
                                                className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200 shadow-sm hover:shadow"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 mr-2"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                </svg>
                                                Edit Vehicle
                                            </Link>
                                            {!deleteConfirm ? (
                                                <button
                                                    onClick={() =>
                                                        setDeleteConfirm(true)
                                                    }
                                                    className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200 shadow-sm hover:shadow"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 mr-2"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    Delete Vehicle
                                                </button>
                                            ) : (
                                                <div className="flex flex-wrap gap-2">
                                                    <button
                                                        onClick={handleDelete}
                                                        className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200 shadow-sm hover:shadow"
                                                    >
                                                        Confirm Delete
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            setDeleteConfirm(
                                                                false
                                                            )
                                                        }
                                                        className="inline-flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200 shadow-sm hover:shadow"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleDetail;
