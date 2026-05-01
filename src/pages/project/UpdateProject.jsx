import React, { useState, useEffect } from 'react';
import { IconX, IconPencil, IconDeviceFloppy } from '@tabler/icons-react';

export const UpdateProjectModal = ({ isOpen, onClose, onUpdate, project }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    dueDate: '',
    status: ''
  });

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || '',
        description: project.description || '',
        dueDate: project.dueDate || '',
        status: project.status || 'Pending'
      });
    }
  }, [project, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onUpdate(project._id, formData);
      alert("Project updated successfully!");
      onClose();
    } catch (err) {
      const apiErrors = err.response?.data?.errors;
      const errorMessage = apiErrors?.name || "Failed to update project.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-950/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white dark:bg-gray-900 w-full max-w-md rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden transform transition-all">

        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/30">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <IconPencil size={22} />
            <h2 className="text-xl font-black text-gray-900 dark:text-white">Update Project</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 transition-colors">
            <IconX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Project Title</label>
            <input
              required
              disabled={loading}
              type="text"
              name='name'
              value={formData.name}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-4 py-3 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500 transition-all disabled:opacity-50"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Status</label>
            <select
              value={formData.status}
              name='status'
              disabled={loading}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-4 py-3 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="Pending">Pending</option>
              <option value="InProgress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Description</label>
            <textarea
              rows="3"
              disabled={loading}
              name='description'
              value={formData.description}
              className="w-full bg-gray-50 dark:bg-gray-800 border rounded-md border-gray-200 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500 resize-none disabled:opacity-50"
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-6 py-3 rounded-md cursor-pointer font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-2 cursor-pointer rounded-md bg-amber-500 hover:bg-amber-600 text-white font-bold py-3  transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : <><IconDeviceFloppy size={20} /> Save Changes</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};