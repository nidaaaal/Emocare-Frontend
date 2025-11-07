import api from "../../../../Api/baseurl"; // your axios instance

const taskService = {
  getTodayTask: async () => {
    const res = await api.get("/today");
    return res.data;
  },
  getPastTasks: async () => {
    const res = await api.get("/tasks/past");
    return res.data;
  },
  getPsychologistTasks: async () => {
    const res = await api.get("/tasks/psychologist");
    return res.data;
  },
};

export default taskService;
