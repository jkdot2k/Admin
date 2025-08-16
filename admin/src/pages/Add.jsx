import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Add = () => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("men's clothing");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const imageUrl = image1
        ? URL.createObjectURL(image1)
        : "https://i.pravatar.cc/150";

      const body = {
        title: name,
        price: parseFloat(price),
        description,
        image: imageUrl,
        category,
      };

      const response = await axios.post(
        "https://fakestoreapi.com/products",
        body
      );

      if (response.data && response.data.id) {
        toast.success("Product added successfully!");
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setSizes([]);
        setBestseller(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add product");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="w-full max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md flex flex-col gap-6"
    >
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800">
        Add New Product
      </h2>

      {/* Upload Images */}
      <div>
        <p className="mb-2 text-gray-700 font-medium">Upload Images</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[{ id: "image1", state: image1, setter: setImage1 },
            { id: "image2", state: image2, setter: setImage2 },
            { id: "image3", state: image3, setter: setImage3 },
            { id: "image4", state: image4, setter: setImage4 }].map((img) => (
            <label
              key={img.id}
              htmlFor={img.id}
              className="cursor-pointer border-2 border-dashed rounded-lg flex items-center justify-center p-2 hover:border-gray-400 transition"
            >
              <img
                className="w-20 h-20 object-cover rounded-md"
                src={!img.state ? assets.upload_area : URL.createObjectURL(img.state)}
                alt=""
              />
              <input
                onChange={(e) => img.setter(e.target.files[0])}
                type="file"
                id={img.id}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div>
        <p className="mb-2 text-gray-700 font-medium">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400 outline-none"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      {/* Product Description */}
      <div>
        <p className="mb-2 text-gray-700 font-medium">Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400 outline-none min-h-[100px]"
          placeholder="Write content here"
          required
        />
      </div>

      {/* Category & Price */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <p className="mb-2 text-gray-700 font-medium">Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400 outline-none"
          >
            <option value="men's clothing">Men</option>
            <option value="women's clothing">Women</option>
            <option value="jewelery">Jewelry</option>
            <option value="electronics">Electronics</option>
          </select>
        </div>

        <div>
          <p className="mb-2 text-gray-700 font-medium">Price ($)</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400 outline-none"
            type="number"
            placeholder="25"
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-2 text-gray-700 font-medium">Sizes</p>
        <div className="flex gap-3 flex-wrap">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <button
              type="button"
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((s) => s !== size)
                    : [...prev, size]
                )
              }
              className={`px-4 py-1 rounded-lg border ${
                sizes.includes(size)
                  ? "bg-gray-400 border-gray-400 text-gray-700"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className="flex items-center gap-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
          className="w-4 h-4 accent-gray-500"
        />
        <label htmlFor="bestseller" className="cursor-pointer text-gray-700">
          Add to Bestseller
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition"
      >
        Add Product
      </button>
    </form>
  );
};

export default Add;
