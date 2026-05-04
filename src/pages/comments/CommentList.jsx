import React, { useState, useEffect } from 'react';
import { commentService } from '../../services/commentService';
import { IconTrash, IconUser } from '@tabler/icons-react';

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
            {comments.length === 0 ? (<>
            <div className="w-full ">
                <h2 className='text-center font-medium text-[8px] uppercase tracking-wider'>No comment yet</h2>
            </div>
            </>) : (
                comments.map((c) => (
                    <div
                        key={c._id}
                        className="bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-700 flex justify-between items-center text-sm"
                    >


                        <div className=" flex flex-col gap-1">
                            <div className="flex items-center gap-1.5 text-gray-800 text-[16px] font-semibold underline dark:text-gray-200">
                                <IconUser size={18} />
                                {c.author}
                            </div>
                            <span className="text-gray-600 dark:text-gray-400">
                                {c.body}
                            </span>

                        </div>
                        <button
                            onClick={() => handleDelete(c._id)}
                            className="text-red-500 cursor-pointer  dark:text-red-400 text-[14px] hover:text-red-600 dark:hover:text-red-500 transition-colors"
                        >
                            <IconTrash size={18} />
                        </button>
                    </div>
                ))
            )

            }
        </div>
    );
};