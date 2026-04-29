import React, { createContext, useContext,  useEffect,  useState } from 'react';
import { dashboardService } from '../services/dashboardService';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () =>{
    try {
      const {data} = await dashboardService.getAllStats();
      setStats(data)
    } catch (err) {
      console.error("Dashboard fetch failed:", err);
      
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <DashboardContext.Provider value={{ stats, loading }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);