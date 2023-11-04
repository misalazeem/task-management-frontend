import axios from "axios";

const API_URL = process.env.REACT_APP_API_TASKS_URL;

class TasksService {
  async getTasks() {
    const token = localStorage.getItem("access_token");

    if (!token) {
      return [];
    }

    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
  }

  async updateTask(task, taskId) {
    const token = localStorage.getItem("access_token");

    try {
      const response = await axios.patch(`${API_URL}/${taskId}`, task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data
    } catch (error) {
        return null;
    }
  }

  async createTask(task) {
    const token = localStorage.getItem("access_token");

    try {
      const response = await axios.post(`${API_URL}/create`, task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data
    } catch (error) {
        return null;
    }
  }

  async deleteTask(taskId) {
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.delete(`${API_URL}/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data
    } catch (error) {
        return null;
    }
  }
}

export default new TasksService();