import React, { useState } from 'react';
import { IconX, IconCircleCheck, IconFlag, IconCalendar, IconAlignLeft } from '@tabler/icons-react';
import { taskService } from '../../services/taskService';

export const AddTaskModal = ({ isOpen, onClose, onAdd, projectId }) => {

  // console.log("props" , projectId)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Todo',
    dueDate: ''
  });

  // console.log(formData)
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // Handles text, date, and select inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Explicit handler for priority buttons
  const handlePrioritySelect = (priority) => {
    setFormData((prev) => ({ ...prev, priority }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // console.log("Task Data:", formData);
    try {
      const response = await taskService.create(projectId, { ...formData });

      // console.log("Submitting with ProjectID:", projectId);

      onAdd(response.data.data);
      console.log("onAdd", response?.data?.data)
      onClose();
      // Reset to defaults
      setFormData({ title: '', description: '', priority: 'Medium', status: 'Pending', dueDate: '' });
    } catch (err) {
      console.error("Failed to create task:", err);
      alert("Error saving task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-950/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white dark:bg-gray-900 w-full max-w-md rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/30">
          <div className="flex items-center gap-2 text-blue-600">
            <IconCircleCheck size={22} />
            <h2 className="text-xl font-black text-gray-900 dark:text-white">Add New Task</h2>
          </div>
          <button onClick={onClose} className="p-2 cursor-pointer rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 transition-colors">
            <IconX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Title</label>
            <input
              required name="title" type="text" placeholder="e.g. Design System Audit"
              value={formData.title} onChange={handleChange}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-4 py-3 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          {/* Description */}
          <div>
            <label className=" text-xs font-black uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-1">
              <IconAlignLeft size={14} /> Description
            </label>
            <textarea
              name="description" placeholder="Add details..." rows="3"
              value={formData.description} onChange={handleChange}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-4 py-3 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>  {/* Due Date */}
            <div className="flex-1">
              <label className=" text-xs font-black uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-1">
                <IconCalendar size={14} /> Due Date
              </label>
              <input
                name="dueDate" type="date"
                value={formData.dueDate} onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-4 py-3 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div></div>
          <div className="flex gap-4">
            {/* Priority */}
            <div className="flex-1">
              <label className=" text-xs font-black uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-1">
                <IconFlag size={14} /> Priority
              </label>
              <div className="flex gap-2">
                {['Low', 'Medium', 'High'].map((p) => (
                  <button
                    key={p} type="button" onClick={() => handlePrioritySelect(p)}
                    className={`flex-1 py-2 rounded-md cursor-pointer text-[10px] font-bold border transition-all ${formData.priority === p ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 border-transparent'
                      }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            disabled={loading} type="submit"
            className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-bold py-3 rounded-md transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
};