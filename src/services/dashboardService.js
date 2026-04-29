import API from "./api";

export const dashboardService = {getAllStats: ()=> API.get('/dashboard')}