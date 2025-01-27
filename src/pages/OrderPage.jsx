import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

const OrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchOrders = async () => {
        try {
            const response = await Axios({ ...SummaryApi.getAllOrders });
            if (response.data.success) setOrders(response.data.data);
        } catch (error) {
            toast.error("Failed to fetch orders");
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const deleteOrder = async (orderId) => {
        if (!window.confirm("Are you sure you want to delete this order?")) return;

        try {
            setLoading(true);
            await Axios({
                ...SummaryApi.deleteOrder,
                url: SummaryApi.deleteOrder.url.replace(":id", orderId),
            });
            toast.success("Order deleted successfully");
            fetchOrders(); // Refresh orders
        } catch (error) {
            toast.error("Failed to delete order");
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, status) => {
        try {
            setLoading(true);
            const response = await Axios.put(SummaryApi.updateOrderStatus.url, {
                orderId: orderId,  // Ensure this is 'orderId' from MongoDB
                status: status,  // The new status selected by the admin
            });
    
            toast.success(response.data.message);  // Show success message
            fetchOrders();  // Refresh the list of orders
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update order status');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Admin: All Orders</h1>
            {orders.length ? (
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Order ID</th>
                            <th className="border px-4 py-2">User ID</th>
                            <th className="border px-4 py-2">Payment Status</th>
                            {/* <th className="border px-4 py-2">Delivery Address</th> */}
                            <th className="border px-4 py-2">Amount</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td className="border px-4 py-2">{order.orderId}</td>
                                <td className="border px-4 py-2">{order.userId}</td>
                                <td className="border px-4 py-2">{order.payment_status}</td>
                                {/* <td className="border px-4 py-2">{order.delivery_address?.address || "N/A"}</td> */}
                                <td className="border px-4 py-2">{order.totalAmt || "N/A"}</td>
                                <td className="border px-4 py-2">
                                    <select
                                        value={order.status || "Processing"}
                                        onChange={(e) => updateOrderStatus(order.orderId, e.target.value)}
                                        disabled={loading}
                                        className="border p-2 rounded"
                                    >
                                        <option value="Processing">Processing</option>
                                        <option value="Designing">Designing</option>
                                        <option value="In Route">In Route</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => deleteOrder(order._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};

export default OrderPage;
