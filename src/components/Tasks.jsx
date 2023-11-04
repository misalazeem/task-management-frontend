import React, { useState } from 'react';
import TasksService from '../providers/TasksService';
import Task from './Task';
import { useQuery } from 'react-query';

const fetchTasks = async () => {
  const tasksData = await TasksService.getTasks();
  return tasksData;
};

const Tasks = () => {
  const { data: tasks, isLoading, refetch } = useQuery('tasks', fetchTasks);
  const [filterStatus, setFilterStatus] = useState('All');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const addTask = async (e) => {
    e.preventDefault();
    const newTask = {
        title: newTaskTitle,
        description: newTaskDescription,
      };
  
      await TasksService.createTask(newTask);
      refetch();
      setNewTaskTitle('');
      setNewTaskDescription('');
  };

  const deleteTask = async (taskId) => {
    await TasksService.deleteTask(taskId);
    refetch();
  };

  const updateTask = async (taskId, task) => {
    await TasksService.updateTask(task, taskId);
    refetch();
  };

  const toggleComplete = async (taskId, completed) => {
    const taskToUpdate = { ...tasks.find((task) => task.id === taskId) };
    taskToUpdate.completed = !taskToUpdate.completed;
    await updateTask(taskId, taskToUpdate);
    refetch();
  };

  const filteredTasks = isLoading ? [] : tasks.filter((task) => {
    if (filterStatus === 'All') {
        return true;
      } else if (filterStatus === 'To Do') {
        return !task.completed;
      } else if (filterStatus === 'Done') {
        return task.completed;
      } else {
        return false;
      }
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col bg-white opacity-75 p-4 rounded items-center justify-center">
      <h2>Create a New Task</h2>
      <div className="flex w-4/5 mb-12">
        <form onSubmit={addTask} className="w-full">
          <div className="flex flex-col">
            <label htmlFor="newTaskTitle">Title:</label>
            <input
              type="text"
              id="newTaskTitle"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="newTaskDescription">Description (optional):</label>
            <textarea
              id="newTaskDescription"
              value={newTaskDescription}
              className="border border-gray-300 rounded-md px-2 py-1"
              onChange={(e) => setNewTaskDescription(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white rounded-md p-2 mt-2">
            Create Task
          </button>
        </form>
      </div>
      
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="mb-4">
        <option value="All">All</option>
        <option value="To Do">To Do</option>
        <option value="Done">Done</option>
      </select>

      {filteredTasks.length === 0 ? (
        <p>No Tasks</p>
      ) : (
        filteredTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDelete={deleteTask}
            updateTask={updateTask}
            onToggleComplete={(completed) => toggleComplete(task.id, completed)}
          />
        ))
      )}
    </div>
  );
};

export default Tasks;
