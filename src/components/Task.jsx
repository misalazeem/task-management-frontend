import React, { useState } from 'react';

const Task = ({ task, onDelete, updateTask, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleDelete = () => {
    onDelete(task.id);
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    updateTask(task.id, { ...task, title: editedTitle, description: editedDescription });
  };

  return (
    <div className={`task ${task.completed ? 'completed' : ''} flex flex-col justify-between items-center p-4 mb-4 border rounded-md shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-102 w-full md:flex-row`}>
      <div className="flex w-4/5 justify-start items-center">
        <label className="text-lg flex flex-col mr-8 items-center justify-center">
          <p>Completed</p>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            className="w-6 h-6 ml-2"
          />
        </label>
        {isEditing ? (
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="border rounded-md px-2 py-1 w-full"
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="border rounded-md px-2 py-1 w-full"
            />
            <button onClick={handleSave} className="bg-green-500 text-white rounded-md p-1">
              Save
            </button>
          </div>
        ) : (
          <div>
            <h3 className="text-2xl font-semibold">{task.title}</h3>
            <p className="text-gray-600 text-lg">{task.description}</p>
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-2">
        <button onClick={handleEdit} className="bg-yellow-400 text-white rounded-md p-2">
          {isEditing ? 'Cancel Edit' : 'Edit'}
        </button>
        <button onClick={handleDelete} className="bg-red-500 text-white rounded-md p-2">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
