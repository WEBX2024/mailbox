import React, { useState } from 'react';
import { FiPlus, FiStar, FiSun, FiCalendar, FiCheckCircle, FiCircle, FiTrash2 } from 'react-icons/fi';
import { mockTasks } from '../../data/mockOther';
import { format, parseISO, isPast } from 'date-fns';
import toast from 'react-hot-toast';
import './Tasks.css';

const taskLists = ['My Day', 'Important', 'Planned', 'All'];

const Tasks = () => {
  const [tasks, setTasks] = useState(mockTasks);
  const [activeList, setActiveList] = useState('My Day');
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const filteredTasks = tasks.filter(t => {
    if (activeList === 'All') return true;
    return t.list === activeList;
  });

  const toggleComplete = (id) => {
    setTasks(prev => prev.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    toast('Task deleted', { icon: '🗑️' });
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: 't' + (Date.now()),
      title: newTaskTitle,
      completed: false,
      dueDate: new Date(Date.now() + 86400000).toISOString(),
      priority: 'medium',
      list: activeList === 'All' ? 'My Day' : activeList,
    };
    setTasks(prev => [newTask, ...prev]);
    setNewTaskTitle('');
    toast.success('Task added');
  };

  const getPriorityColor = (p) => {
    switch (p) {
      case 'high': return 'var(--error)';
      case 'medium': return 'var(--warning)';
      default: return 'var(--text-muted)';
    }
  };

  const completedCount = filteredTasks.filter(t => t.completed).length;

  return (
    <div className="tasks-page">
      {/* Sidebar */}
      <div className="tasks-sidebar">
        <h2 className="tasks-sidebar-title">To Do</h2>
        {taskLists.map(list => {
          const count = tasks.filter(t => list === 'All' ? true : t.list === list).length;
          return (
            <button
              key={list}
              className={`tasks-list-item ${activeList === list ? 'active' : ''}`}
              onClick={() => setActiveList(list)}
            >
              {list === 'My Day' && <FiSun size={16} />}
              {list === 'Important' && <FiStar size={16} />}
              {list === 'Planned' && <FiCalendar size={16} />}
              {list === 'All' && <FiCheckCircle size={16} />}
              <span>{list}</span>
              <span className="tasks-list-count">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Main content */}
      <div className="tasks-main">
        <div className="tasks-header">
          <h2>{activeList}</h2>
          <span className="tasks-progress">
            {completedCount}/{filteredTasks.length} completed
          </span>
        </div>

        {/* Add task form */}
        <form className="tasks-add-form" onSubmit={addTask}>
          <FiPlus size={16} className="tasks-add-icon" />
          <input
            type="text"
            placeholder="Add a task"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="tasks-add-input"
          />
        </form>

        {/* Task list */}
        <div className="tasks-list-scroll">
          {filteredTasks.length === 0 ? (
            <div className="tasks-empty">
              <FiCheckCircle size={40} />
              <p>No tasks here yet</p>
            </div>
          ) : (
            <>
              {/* Incomplete tasks */}
              {filteredTasks.filter(t => !t.completed).map(task => (
                <div key={task.id} className="task-item">
                  <button
                    className="task-check"
                    onClick={() => toggleComplete(task.id)}
                    style={{ borderColor: getPriorityColor(task.priority) }}
                  >
                    <FiCircle size={18} />
                  </button>
                  <div className="task-content">
                    <span className="task-title">{task.title}</span>
                    <span className="task-due" style={{
                      color: isPast(parseISO(task.dueDate)) ? 'var(--error)' : 'var(--text-muted)'
                    }}>
                      Due {format(parseISO(task.dueDate), 'MMM d')}
                    </span>
                  </div>
                  <button className="task-delete" onClick={() => deleteTask(task.id)} title="Delete task">
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))}

              {/* Completed tasks */}
              {completedCount > 0 && (
                <div className="tasks-completed-group">
                  <div className="tasks-completed-header">Completed ({completedCount})</div>
                  {filteredTasks.filter(t => t.completed).map(task => (
                    <div key={task.id} className="task-item completed">
                      <button className="task-check done" onClick={() => toggleComplete(task.id)}>
                        <FiCheckCircle size={18} />
                      </button>
                      <div className="task-content">
                        <span className="task-title">{task.title}</span>
                      </div>
                      <button className="task-delete" onClick={() => deleteTask(task.id)} title="Delete task">
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
