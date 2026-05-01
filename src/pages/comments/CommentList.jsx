import React, { useState, useEffect } from 'react';
import { commentService } from '../../services/commentService';

export const CommentList = ({ taskId }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchComments = async () => {
        try {
            setLoading(true);
            const res = await commentService.getComments(taskId);
            setComments(res?.data?.data || []);
        } catch (err) {
            console.error("Failed to load comments", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (commentId) => {
        if (!window.confirm("Delete this comment?")) return;
        try {
            await commentService.delete(commentId);
            setComments(comments.filter(c => c._id !== commentId));
        } catch (err) {
            alert("Failed to delete.");
        }
    };

    useEffect(() => {
        fetchComments();
    }, [taskId]);

    if (loading) return <p className="text-xs text-gray-400">Loading...</p>;

    return (
        <div className="space-y-2 mt-2">
            {comments.map((c) => (
                <div
                    key={c._id}
                    className="bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-700 flex justify-between items-center text-sm"
                >


                    <div className=" flex flex-col gap-1">
                        <span className="text-gray-800 text-[16px] font-semibold underline dark:text-gray-200">
                            {c.author}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                            {c.body}
                        </span>

                    </div>
                    <button
                        onClick={() => handleDelete(c._id)}
                        className="text-red-500 cursor-pointer  dark:text-red-400 text-[14px] hover:text-red-600 dark:hover:text-red-500 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};