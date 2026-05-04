import React, { useState } from 'react';
import { IconX, IconMessage, IconUser } from '@tabler/icons-react';
import { commentService } from '../../services/commentService';

export const AddCommentModal = ({ isOpen, onClose, onAdd, taskId }) => {
    const [formData, setFormData] = useState({ author: '', body: '' });
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await commentService.add(taskId, { ...formData });
            alert(response?.data?.message || "Comment added successfully");
            onAdd(response?.data?.data);      
            onClose();
            setFormData({ author: '', body: '' });
        } catch (err) {

            console.error("Failed to post comment:", err);

            alert(err?.response?.data?.message || "Error posting comment. Please try again.");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-80 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-950/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-white dark:bg-gray-900 w-full max-w-sm rounded-md shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/30">
                    <div className="flex items-center gap-2 text-blue-600">
                        <IconMessage size={22} />
                        <h2 className="text-xl font-black text-gray-900 dark:text-white">Add Comment</h2>
                    </div>
                    <button onClick={onClose} className="p-2 cursor-pointer rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 transition-colors">
                        <IconX size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Author Input */}
                    <div>
                        <label className="flex items-center gap-1 text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                            <IconUser size={14} />
                            Author</label>
                        <input
                            required
                            type="text"
                            maxLength={50}
                            placeholder="Your name"
                            value={formData.author}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Body Input */}
                    <div>
                        <label className="flex items-center gap-1 text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                            <IconMessage size={14} />
                            Comment</label>
                        <textarea
                            required
                            rows="4"
                            maxLength={300}
                            placeholder="Type your comment here..."
                            value={formData.body}
                            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                        />
                        <div className="text-[10px] text-gray-400 text-right mt-1">{formData.body.length}/300</div>
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-bold py-3 rounded-md transition-all active:scale-95 disabled:opacity-50"
                    >
                        {loading ? "Posting..." : "Post Comment"}
                    </button>
                </form>
            </div>
        </div>
    );
};