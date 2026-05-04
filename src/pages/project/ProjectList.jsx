import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../../components/layout/Footer';
import { IconChevronLeft, IconChevronRight, IconEditCircle, IconInfoCircle, IconTrash } from '@tabler/icons-react';
import { AddProjectModal } from './AddProjectModal';
import { UpdateProjectModal } from './UpdateProject';
import { useProjectContext } from '../../hooks/useProjectContext';

export const ProjectList = () => {
  // 1. Context Hooks
  const {
    projects,
    loading,
    addProject,
    updateProject,
    deleteProject
  } = useProjectContext();

  // 2. Local UI State (Only for Modals & Pagination)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = projects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  console.log("currentItems", currentItems)

  const openEditModal = (project) => {
    setSelectedProject(project);
    setIsEditModalOpen(true);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'In Progress': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <main className="grow max-w-7xl w-full px-3 py-5 md:px-8 mx-auto md:py-10 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">Projects</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage and track your active workspace projects.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-md transition-all active:scale-95 shadow-lg shadow-blue-600/20">
            + New Project
          </button>
        </div>

        {/* Projects Table */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full md:text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                  <th className="px-3 md:px-6 py-2 md:py-4 text-xs font-semibold uppercase tracking-widest text-gray-400">Project Name</th>
                  <th className="px-3 md:px-6 py-2 md:py-4 text-xs font-semibold uppercase tracking-widest text-gray-400">Status</th>
                  <th className="px-3 md:px-6 py-2 md:py-4 text-xs font-semibold uppercase tracking-widest text-gray-400">Tasks</th>
                  <th className="px-3 md:px-6 py-2 md:py-4 text-xs font-semibold uppercase tracking-widest text-gray-400 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan="4" className="px-6 py-8 bg-gray-50/50 dark:bg-gray-800/20"></td>
                    </tr>
                  ))
                ) : (
                  currentItems.map((project) => (
                    <tr key={project._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors group cursor-pointer">

                      {/* Project Name */}
                      <td className="px-3 md:px-6 py-2.5 md:py-5">
                        <span className="text-[12px] md:text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                          {project.name}
                        </span>
                      </td>

                      {/* Progress Summary (Using statusSummary) */}
                      <td className="px-3 md:px-6 py-2.5 md:py-5">
                        <div className="flex gap-1 md:gap-2 text-xs font-semibold uppercase tracking-widest">
                          <span className="text-amber-500">{project.statusSummary?.todo || 0} Todo</span>
                          <span className="text-blue-500">{project.statusSummary?.inProgress || 0} Active</span>
                          <span className="text-emerald-500">{project.statusSummary?.done || 0} Done</span>
                        </div>
                      </td>

                      {/* Total Tasks */}
                      <td className="px-3 md:px-6 py-2.5 md:py-5">
                        <span className="text-gray-600 dark:text-gray-400 text-xs md:text-sm font-semibold ">
                          {project.totalTasks} Total Tasks
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5 text-right flex items-center justify-center gap-1">
                        <Link
                          to={`/projects/${project._id}`}
                          className="bg-gray-100 dark:bg-gray-800 cursor-pointer text-gray-600 px-2 md:px-4 py-1 md:py-2 rounded-md text-sm font-semibold hover:bg-blue-600 hover:text-white transition-all"
                        >
                          <IconInfoCircle size={18} stroke={2} />
                        </Link>
                        <button
                          onClick={() => {
                            setSelectedProject(project);
                            setIsEditModalOpen(true);
                          }}
                          className="bg-gray-100 dark:bg-gray-800 cursor-pointer text-gray-600 px-2 md:px-4 py-1 md:py-2 rounded-md text-sm font-semibold hover:bg-blue-800 hover:text-white transition-all"
                        >
                          <IconEditCircle size={18} stroke={2}/>
                        </button>
                        <button
                          onClick={() => deleteProject(project._id)}
                          className="bg-gray-100 dark:bg-gray-800 cursor-pointer text-gray-600 px-2 md:px-4 py-1 md:py-2 rounded-md text-sm font-semibold hover:bg-red-600 hover:text-white transition-all"
                        >
                         <IconTrash size={18} stroke={2}/>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {!loading && projects.length > itemsPerPage && (
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="p-2 border rounded-lg hover:bg-white disabled:opacity-30">
                  <IconChevronLeft size={20} />
                </button>
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="p-2 border rounded-lg hover:bg-white disabled:opacity-30">
                  <IconChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <AddProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addProject} // add Project context function
      />
      <UpdateProjectModal
        isOpen={isEditModalOpen}
        project={selectedProject}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={updateProject} //update Project context function
      />
      <Footer />
    </div>
  );
};