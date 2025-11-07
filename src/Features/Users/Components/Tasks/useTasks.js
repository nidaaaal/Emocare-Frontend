import { useState, useEffect } from "react";
import taskService from "./TaskService";

export const useTasks = (type) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        let data = [];
        if (type === "today") data = await taskService.getTodayTask();
        if (type === "past") data = await taskService.getPastTasks();
        if (type === "psychologist") data = await taskService.getPsychologistTasks();

        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [type]);

  return { tasks, loading };
};
