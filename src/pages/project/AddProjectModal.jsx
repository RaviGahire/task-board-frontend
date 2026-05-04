import React, { useState } from 'react';
import { IconFolderPlus, IconX, IconFileDescription, IconCalendar, IconSubtitlesEdit } from '@tabler/icons-react';

export const AddProjectModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    dueDate: '',
    status: ''
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onAdd(formData);
      alert("Project created successfully!");

      onClose();
      setFormData({ name: '', description: '', dueDate: '', status: 'Pending' });

    } catch (err) {

      const apiErrors = err.response?.data?.errors;
      const errorMessage =
        apiErrors?.name ||
        err.response?.data?.message ||
        "Failed to create project. Please try again.";

      alert(errorMessage);

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-950/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white dark:bg-gray-900 w-full max-w-md rounded-md shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">

        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/30">
          <div className="flex items-center gap-2">
            <IconFolderPlus className="text-blue-600" size={22} />
            <h2 className="text-xl font-black text-gray-900 dark:text-white">New Project</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500">
            <IconX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className=" text-xs font-black uppercase tracking-widest text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-1">
              <IconSubtitlesEdit size={14} />Project Title</label>
            <input
              required
              type="text"
              name="name"
              placeholder="Enter project title"
              disabled={loading}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all disabled:opacity-50"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className=" text-xs font-black uppercase tracking-widest text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-1">
              <IconFileDescription size={14} /> Description
            </label>
            <textarea
              rows="3"
              required
              disabled={loading}
              placeholder="Brief summary..."
              className="w-full bg-gray-50 dark:bg-gray-800 border rounded-md border-gray-200 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all resize-none disabled:opacity-50"
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <label className="flex text-xs font-black uppercase tracking-widest text-gray-800 dark:text-gray-100 mb-2  items-center gap-1">
              <IconCalendar size={14} /> Deadline
            </label>

            <input
              required
              type="date"
              disabled={loading}
              className="w-full bg-gray-50 dark:bg-gray-800 border rounded-md border-gray-200 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all disabled:opacity-50"
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-6 py-3 cursor-pointer rounded-md font-bold text-gray-500 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md transition-all active:scale-95 shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};