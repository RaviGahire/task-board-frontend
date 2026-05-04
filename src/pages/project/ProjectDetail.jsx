import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Footer } from '../../components/layout/Footer';
import { AddTaskModal } from '../tasks/AddTaskModal';
import { UpdateTaskModal } from '../tasks/UpdateTaskModal';
import { projectService } from '../../services/projectService';
import { taskService } from '../../services/taskService';
import { formatDate } from '../../utils/formatDate';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { AddCommentModal } from '../tasks/AddCommentModal';
import { commentService } from '../../services/commentService';
import { CommentList } from '../comments/CommentList';

export const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatedTask, setUpdatedTask] = useState([]);
    const [error, setError] = useState(null);
    const [currentTaskId, setCurrentTaskId] = useState(null);
    const [commentsData, setCommentsData] = useState([])
    const [comments, setComments] = useState([])

    // Modals
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch Project, Tasks, and ALL comments for this project in one go
                const [projRes, taskRes, commentRes] = await Promise.all([
                    projectService.getById(id),
                    taskService.getByProjectId(id),
                    // commentService.getComments(id) // <--- Use this!
                ]);

                setProject(projRes.data.data);
                setTasks(taskRes?.data?.data?.tasks || []);
                // setComments(commentRes?.data?.data || []); // This sets ALL project comments

            } catch (err) {
                setError("Failed to load project details.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleAddTask = (newTask) => {
        setTasks((prev) => [...prev, newTask]);
        alert("Task added successfully", tasks)
    };

    const handleUpdateTask = async (updatedTaskData) => {
        try {

            await taskService.update(updatedTaskData._id, updatedTaskData);


            setTasks(prevTasks => prevTasks.map(task =>
                task._id === updatedTaskData._id ? updatedTaskData : task
            ));
            alert("Task updated successfully.");
            setIsEditTaskOpen(false);
        } catch (err) {
            console.error("Failed to update task", err);
            alert("Failed to update task.");
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;

        try {
            await taskService.delete(taskId);
            setTasks((prev) => prev.filter((t) => t._id !== taskId));
        } catch (err) {
            alert("Failed to delete task.");
        }
    };

    const handleOpenCommentModal = (taskId) => {
        setCurrentTaskId(taskId);
        setIsCommentModalOpen(true);
    };



    if (loading) return <div className="p-20 text-center dark:text-white">Loading project details...</div>;
    if (error) return <div className="p-20 text-center text-red-500">{error}</div>;

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
            <main className="grow max-w-5xl w-full px-8 mx-auto py-10 space-y-8">
                {/* Breadcrumbs */}
                <nav className="text-sm font-bold uppercase tracking-widest text-gray-400">
                    <Link to="/projects" className="hover:text-blue-600 transition-colors">Projects</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900 dark:text-white">{project?.name}</span>
                </nav>

                {/* Project Header */}
                <div className="bg-white dark:bg-gray-900 p-8 rounded-md border border-gray-200 dark:border-gray-800 shadow-sm">
                    <h1 className=" text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-2">{project?.name}</h1>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl">{project?.description}</p>
                </div>

                {/* Task List */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tasks ({tasks.length})</h2>
                        <button
                            onClick={() => setIsTaskModalOpen(true)}
                            className="text-md cursor-pointer font-bold text-blue-600 hover:underline transition-colors"
                        >
                            + Add Task
                        </button>
                    </div>

                    <div className="grid gap-3">
                        {tasks.map((task) => (
                            <div key={task._id} className="group bg-white dark:bg-gray-900 p-5 rounded-md border border-gray-100 dark:border-gray-800 flex flex-col gap-4 hover:border-blue-500/50 transition-all shadow-sm">

                                {/* TOP SECTION: Details + Buttons */}
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex gap-4">
                                        <div className={`mt-2 w-2 h-2 rounded-full shrink-0 ${task.status === 'Done' ? 'bg-emerald-500' : 'bg-amber-500 '}`} />
                                        <div className="flex flex-col gap-1">
                                            <span className={`font-bold text-lg capitalize ${task.status === 'Done' ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-white'}`}>
                                                {task.title}
                                            </span>

                                            <div className="flex flex-wrap gap-3 mt-1">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-red-400 flex items-center gap-1">
                                                    <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" /> Priority: {task.priority}
                                                </span>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 flex items-center gap-1">
                                                    <span className="w-2 h-2 bg-blue-500 rounded-full" /> Due: {formatDate(task.dueDate)}
                                                </span>
                                            </div>

                                            {task.description && (
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
                                                    {task.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => { setSelectedTask(task); setIsEditTaskOpen(true); }}
                                            className="p-2 text-amber-600 cursor-pointer bg-amber-50 dark:bg-amber-900/20 rounded-xl hover:bg-amber-100 transition-colors"
                                        >
                                            <IconPencil size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteTask(task._id)}
                                            className="p-2 text-red-600 bg-red-50 cursor-pointer dark:bg-red-900/20 rounded-xl hover:bg-red-100 transition-colors"
                                        >
                                            <IconTrash size={18} />
                                        </button>
                                    </div>
                                </div>

                                {/* BOTTOM SECTION: Comments Divider & List */}
                                <div className="border-t border-gray-100 dark:border-gray-800 pt-4 mt-2">
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Comments</h4>
                                        <button
                                            onClick={() => handleOpenCommentModal(task._id)}
                                            className="text-[12px] cursor-pointer font-bold text-blue-600 hover:text-blue-500 transition-colors"
                                        >
                                            + Add Comment
                                        </button>
                                    </div>

                                    {/* The Component you created */}
                                    <CommentList taskId={task._id} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            {/* Add Task modal */}
            <AddTaskModal
                isOpen={isTaskModalOpen}
                onClose={() => setIsTaskModalOpen(false)}
                onAdd={handleAddTask}
                projectId={id}
            />
            {/* Update task modal */}
            <UpdateTaskModal
                isOpen={isEditTaskOpen}
                onClose={() => setIsEditTaskOpen(false)}
                onUpdate={handleUpdateTask}
                task={selectedTask}
            />
            {/* Add comment modal */}
            <AddCommentModal
                isOpen={isCommentModalOpen}
                onClose={() => setIsCommentModalOpen(false)}
                taskId={currentTaskId}
                onAdd={(data) => setCommentsData(data)}
            />

            <Footer />
        </div>
    );
};