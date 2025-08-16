import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [statusMap, setStatusMap] = useState({}); // store order status in state

  // Fetch carts (orders) and products
  const fetchOrders = async () => {
    try {
      const [cartsRes, productsRes] = await Promise.all([
        axios.get("https://fakestoreapi.com/carts"),
        axios.get("https://fakestoreapi.com/products"),
      ]);

      setOrders(cartsRes.data.reverse());
      setProducts(productsRes.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch orders");
    }
  };

  // Get product details by ID
  const getProductDetails = (id) => {
    return products.find((p) => p.id === id) || {};
  };

  // Handle order status change (local only)
  const statusHandler = (event, orderId) => {
    setStatusMap((prev) => ({ ...prev, [orderId]: event.target.value }));
    toast.success("Status updated (local only)");
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h3 className="text-xl font-bold mb-6 text-gray-800">Orders</h3>
      <div className="grid gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition"
          >
            {/* Top row with image + meta */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              {/* Image */}
              <img
                className="w-20 h-20 object-contain mx-auto md:mx-0"
                src={getProductDetails(order.products[0]?.productId).image}
                alt="order"
              />

              {/* Order details */}
              <div className="flex-1">
                <h4 className="font-semibold text-gray-700 mb-2">
                  Order #{order.id}
                </h4>
                <div className="space-y-1 text-sm text-gray-600">
                  {order.products.map((item, idx) => {
                    const product = getProductDetails(item.productId);
                    return (
                      <p key={idx}>
                        {product.title || "Unknown"} × {item.quantity}
                      </p>
                    );
                  })}
                </div>

                {/* Customer details */}
                <div className="mt-4">
                  <p className="font-medium text-gray-700">John Doe</p>
                  <p className="text-sm text-gray-500">
                    123 Main St, Sample City, Sample State, 12345
                  </p>
                  <p className="text-sm text-gray-500">+1 9876543210</p>
                </div>
              </div>

              {/* Order meta */}
              <div className="text-sm text-gray-600 space-y-2">
                <p>
                  <span className="font-medium">Items:</span>{" "}
                  {order.products.length}
                </p>
                <p>
                  <span className="font-medium">Method:</span> Cash on Delivery
                </p>
                <p>
                  <span className="font-medium">Payment:</span> Pending
                </p>
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>

              {/* Amount */}
              <div className="text-right">
                <p className="text-lg font-bold text-gray-800">
                  $
                  {order.products
                    .reduce((total, item) => {
                      const product = getProductDetails(item.productId);
                      return total + (product.price || 0) * item.quantity;
                    }, 0)
                    .toFixed(2)}
                </p>
              </div>
            </div>

            {/* Status dropdown */}
            <div className="mt-6 flex items-center justify-between border-t pt-4">
              <p className="text-sm text-gray-500">
                Update Status:
              </p>
              <select
                onChange={(e) => statusHandler(e, order.id)}
                value={statusMap[order.id] || "Order Placed"}
                className="px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
