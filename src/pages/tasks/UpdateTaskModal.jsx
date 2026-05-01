import React, { useState, useEffect } from 'react';
import { IconX, IconPencil, IconFlag, IconAlignLeft, IconCalendar } from '@tabler/icons-react';
import { taskService } from '../../services/taskService';

export const UpdateTaskModal = ({ isOpen, onClose, onUpdate, task }) => {
  const [formData, setFormData] = useState({
    title: '',
    priority: 'Medium',
    status: 'Todo',
    description: '',
    dueDate: ''
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        priority: task.priority || 'Medium',
        status: task.status || 'Todo',
        description: task.description || '',
        // Format date to YYYY-MM-DD for the date input
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : ''
      });
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the merged data
      await onUpdate({ ...task, ...formData });
      onClose();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-950/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white dark:bg-gray-900 w-full max-w-sm rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden transform transition-all">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/30">
          <div className="flex items-center gap-2 text-amber-500">
            <IconPencil size={22} />
            <h2 className="text-xl font-black text-gray-900 dark:text-white">Edit Task</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 transition-colors">
            <IconX size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Title</label>
            <input
              required
              type="text"
              value={formData.title}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500"
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          {/* Description */}
          <div>
            <label className=" text-xs font-black uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-1">
              <IconAlignLeft size={14} /> Description
            </label>
            <textarea
              rows="3"
              value={formData.description}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500"
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Status & Date Row */}
          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Status</label>
                <select
                    value={formData.status}
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500"
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                    <option value="Todo">Todo</option>
                    <option value="InProgress">In Progress</option>
                    <option value="Review">Review</option>
                    <option value="Done">Done</option>
                </select>
             </div>
             <div>
                <label className=" text-xs font-black uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-1">
                    <IconCalendar size={14} /> Due Date
                </label>
                <input 
                    type="date"
                    value={formData.dueDate}
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500"
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
             </div>
          </div>

          {/* Priority */}
          <div>
            <label className=" text-xs font-black uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-1">
              <IconFlag size={14} /> Priority
            </label>
            <div className="flex gap-2">
              {['Low', 'Medium', 'High'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setFormData({ ...formData, priority: p })}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${formData.priority === p
                    ? 'bg-amber-500 border-amber-500 text-white shadow-md shadow-amber-500/20'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 hover:border-amber-400'
                    }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-2xl font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-2xl transition-all active:scale-95 shadow-lg shadow-amber-500/20"
            >
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};