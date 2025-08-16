import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { X, Pencil } from "lucide-react";

const List = () => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({ title: "", price: "", category: "" });

  // Fetch products
  const fetchList = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setList(response.data.reverse());
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products");
    }
  };

  // Remove product
  const removeProduct = async (id) => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      toast.success("Product removed (simulated)");
      setList((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove product");
    }
  };

  // Edit handling
  const handleEdit = (product) => {
    setEditProduct(product.id);
    setFormData({
      title: product.title,
      price: product.price,
      category: product.category,
    });
  };

  const saveEdit = () => {
    setList((prev) =>
      prev.map((item) =>
        item.id === editProduct ? { ...item, ...formData } : item
      )
    );
    setEditProduct(null);
    toast.success("Product updated (simulated)");
  };

  useEffect(() => {
    fetchList();
  }, []);

  const filteredList = list.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-5 gap-3">
        <h2 className="text-xl font-semibold text-gray-700">📦 All Products</h2>
        <input
          type="text"
          placeholder="Search products..."
          className="border px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-black focus:outline-none text-sm w-full md:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table for desktop */}
      <div className="hidden md:block border rounded-lg overflow-hidden">
        <div className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] bg-gray-100 py-3 px-4 font-semibold text-sm">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Edit</span>
          <span className="text-center">Delete</span>
        </div>
        {filteredList.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center px-4 py-3 border-b text-sm hover:bg-gray-50 transition"
          >
            <img src={item.image} alt={item.title} className="w-12 h-12 object-contain" />
            <p className="truncate">{item.title}</p>
            <p className="capitalize">{item.category}</p>
            <p className="font-medium">${item.price}</p>
            <button
              onClick={() => handleEdit(item)}
              className="flex items-center justify-center text-blue-500 hover:text-blue-700"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={() => removeProduct(item.id)}
              className="flex items-center justify-center text-red-500 hover:text-red-700"
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Card style for mobile */}
      <div className="grid gap-3 md:hidden">
        {filteredList.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-3 flex gap-3 items-center shadow-sm"
          >
            <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold">{item.title}</h3>
              <p className="text-xs text-gray-500">{item.category}</p>
              <p className="font-medium mt-1">${item.price}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="text-blue-500 hover:text-blue-700"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => removeProduct(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96 animate-fadeIn">
            <h2 className="text-lg font-semibold mb-4">✏️ Edit Product</h2>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded-md"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Price</label>
                <input
                  type="number"
                  className="w-full border px-3 py-2 rounded-md"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Category</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded-md"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setEditProduct(null)}
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default List;
