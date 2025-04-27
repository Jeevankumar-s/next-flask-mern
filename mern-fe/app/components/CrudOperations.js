"use client";

import { useState, useEffect } from "react";
import API from "@/app/utils/api";
import { toast } from "react-toastify";

const CrudOperations = ({ module }) => {
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await API.get(`/${module}`);
      setItems(res.data);
    } catch (err) {
      toast.error(`Failed to fetch ${module}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/${module}/${editingId}`, { name });
        toast.success(`${module.charAt(0).toUpperCase() + module.slice(1)} updated!`);
      } else {
        await API.post(`/${module}`, { name });
        toast.success(`${module.charAt(0).toUpperCase() + module.slice(1)} added!`);
      }
      setName("");
      setEditingId(null);
      fetchItems();
    } catch (err) {
      toast.error(`Error saving ${module}`);
    }
  };

  const handleEdit = (item) => {
    setName(item.name);
    setEditingId(item.id || item._id); // Support both id and _id
  };

  const handleDelete = async (id) => {
    if (!confirm(`Are you sure you want to delete this ${module}?`)) return;
    try {
      await API.delete(`/${module}/${id}`);
      toast.success(`${module.charAt(0).toUpperCase() + module.slice(1)} deleted!`);
      fetchItems();
    } catch (err) {
      toast.error(`Error deleting ${module}`);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">{`${module.charAt(0).toUpperCase() + module.slice(1)} Management`}</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
        <input
          type="text"
          placeholder={`${module.charAt(0).toUpperCase() + module.slice(1)} Name`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded p-2 w-72"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      {/* Table */}
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2 text-left">{`${module.charAt(0).toUpperCase() + module.slice(1)} Name`}</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={item.id || item._id}>
              <td className="border p-2 text-center">{idx + 1}</td>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2 text-center">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id || item._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrudOperations;
