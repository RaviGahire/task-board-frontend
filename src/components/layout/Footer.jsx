export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded">
              VB
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              © {currentYear} <span className="text-gray-900 dark:text-white font-semibold">VarBoard</span>
            </p>
          </div>
        
          <div className="flex gap-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            <span className="cursor-default">Fullstack Assignment</span>
            <span className="hidden md:block text-gray-200 dark:text-gray-800">|</span>
            <span className="cursor-default text-blue-600 dark:text-blue-400">Node + React</span>
          </div>
          
        </div>
      </div>
    </footer>
  );
};