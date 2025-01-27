// import React from 'react'
// import { useSelector } from 'react-redux'
// import NoData from '../components/NoData'

// const MyOrders = () => {
//   const orders = useSelector(state => state.orders.order)

//   console.log("order Items",orders)
//   return (
//     <div>
//       <div className='bg-white shadow-md p-3 font-semibold'>
//         <h1>Order</h1>
//       </div>
//         {
//           !orders[0] && (
//             <NoData/>
//           )
//         }
//         {
//           orders.map((order,index)=>{
//             return(
//               <div key={order._id+index+"order"} className='order rounded p-4 text-sm'>
//                   <p>Order No : {order?.orderId}</p>
//                   <div className='flex gap-3'>
//                     <img
//                       src={order.product_details.image[0]} 
//                       className='w-14 h-14'
//                     />  
//                     <p className='font-medium'>{order.product_details.name}</p>
//                   </div>
//               </div>
//             )
//           })
//         }
//     </div>
//   )
// }

// export default MyOrders














// import React from 'react';
// import { useSelector } from 'react-redux';
// import NoData from '../components/NoData';

// const MyOrders = () => {
//   const orders = useSelector((state) => state.orders.order); // Fetch orders from Redux state

//   console.log('Order Items', orders);

//   return (
//     <div>
//       <div className="bg-white shadow-md p-3 font-semibold">
//         <h1>My Orders</h1>
//       </div>
//       {/* If no orders exist, show a NoData component */}
//       {!orders[0] && <NoData />}
//       {/* Map over orders and display their details */}
//       {orders.map((order, index) => (
//         <div
//           key={order._id + index + 'order'}
//           className="order rounded border shadow-md p-4 mb-4 text-sm"
//         >
//           {/* Order Details */}
//           <p className="mb-2">
//             <span className="font-semibold">Order No:</span> {order?.orderId}
//           </p>
//           <div className="flex gap-3 mb-2">
//             <img
//               src={order.product_details.image[0]}
//               alt="Product"
//               className="w-14 h-14 object-cover rounded"
//             />
//             <div>
//               <p className="font-medium">{order.product_details.name}</p>
//               <p className="text-gray-500 text-xs">Qty: {order.quantity}</p>
//             </div>
//           </div>
//           {/* Order Status */}
//           <div>
//             <span className="font-semibold">Status:</span>{' '}
//             <span
//               className={`text-xs font-medium px-2 py-1 rounded ${
//                 order.status === 'Processed'
//                   ? 'bg-yellow-200 text-yellow-800'
//                   : order.status === 'Designing'
//                   ? 'bg-blue-200 text-blue-800'
//                   : order.status === 'In Route'
//                   ? 'bg-purple-200 text-purple-800'
//                   : order.status === 'Delivered'
//                   ? 'bg-green-200 text-green-800'
//                   : 'bg-gray-200 text-gray-800'
//               }`}
//             >
//               {order.status}
//             </span>


//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyOrders;


































import React from 'react';
import { useSelector } from 'react-redux';
import NoData from '../components/NoData';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
  const navigate = useNavigate();
  const orders = useSelector((state) => state.orders.order); // Fetch orders from Redux state

  console.log('Order Items', orders);

  const handleReview = (orderId, productId) => {
    const url = `/review?orderId=${orderId}&productId=${productId}`;
    navigate(url);  };

  // Handler for canceling an order
  const handleCancel = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      navigate("/cancel")


    }
  };

  const handleReturn = (orderId) => {
    if (window.confirm('Are you sure you want to return this order?')) {
      navigate("/return")


    }
  };

  return (
    <div>
      <div className="bg-white shadow-md p-3 font-semibold">
        <h1>My Orders</h1>
      </div>
      {/* If no orders exist, show a NoData component */}
      {!orders[0] && <NoData />}
      {/* Map over orders and display their details */}
      {orders.map((order, index) => (
        <div
          key={order._id + index + 'order'}
          className="order rounded border shadow-md p-4 mb-4 text-sm"
        >
          {/* Order Details */}
          <p className="mb-2">
            <span className="font-semibold">Order No:</span> {order?.orderId}
          </p>
          <div className="flex gap-3 mb-2">
            <img
              src={order.product_details.image[0]}
              alt="Product"
              className="w-14 h-14 object-cover rounded"
            />
            <div>
              <p className="font-medium">{order.product_details.name}</p>
              <p className="text-gray-500 text-xs">Qty: {order.quantity}</p>
            </div>
          </div>
          {/* Order Status */}
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <span className="font-semibold">Status:</span>{' '}
              <span
                className={`text-xs font-medium px-4 py-1 rounded ${order.status === 'Processed'
                  ? 'bg-yellow-200 text-yellow-800'
                  : order.status === 'Designing'
                    ? 'bg-blue-200 text-blue-800'
                    : order.status === 'In Route'
                      ? 'bg-purple-200 text-purple-800'
                      : order.status === 'Delivered'
                        ? 'bg-green-200 text-green-800'
                        : 'bg-gray-200 text-gray-800'
                  }`}
              >
                {order.status}
              </span>
            </div>
            <div className="mt-4 flex gap-3 items-center">
              {order.status === 'Delivered' ? (
                <>
                  {/* Review Button */}
                  <button
                    onClick={() => handleReview(order._id, order.productId)}
                    className="bg-blue-500 text-white px-4 py-2 text-sm font-medium rounded-lg shadow-md hover:bg-blue-600 transition-colors"
                  >
                    Review
                  </button>

                  {/* Return Button */}
                  <button
                    onClick={() => handleReturn(order._id)} // Replace with handleReturn logic
                    className="bg-yellow-500 text-white px-4 py-2 text-sm font-medium rounded-lg shadow-md hover:bg-yellow-600 transition-colors"
                  >
                    Return
                  </button>
                </>
              ) : (
                /* Cancel Button */
                <button
                  onClick={() => handleCancel(order._id)}
                  className="bg-red-500 text-white px-4 py-2 text-sm font-medium rounded-lg shadow-md hover:bg-red-600 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>

          </div>

        </div>

      ))}
    </div>
  );
};

export default MyOrders;
