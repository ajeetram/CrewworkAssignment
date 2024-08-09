import React, { useState } from "react";
import styles from "./task.module.css";
import { FiClock } from "react-icons/fi";
import toast from "react-hot-toast";
import { useMyContext } from "../context/MyContext";
import { LuFileEdit, LuDelete } from "react-icons/lu";
import UpdateTask from './updateTaskPage';

interface Color {
  name: string;
  hexcode: string;
}

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  deadline: string;
  priority: string;
}

interface UpdateTaskProps {
  taskId: string;
  status: string;
  title: string;
  description: string;
  priority: string;
  deadline: string;
}

const colors: Color[] = [
  { name: "Low", hexcode: "#0ECC5A" },
  { name: "Medium", hexcode: "#FFA235" },
  { name: "Urgent", hexcode: "#FF6B6B" },
];

interface TaskComponentProps {
  taskData: Task;
  getTask: () => void;
  setCallTask: (value: boolean) => void;
  setActiveCard: (index: number | null) => void;
  index: number;
}

const TaskComponent: React.FC<TaskComponentProps> = ({ taskData, getTask, setCallTask, setActiveCard, index }) => {
  const { auth } = useMyContext();
  const [updatePopup, setUpdatePopup] = useState(false);

  const selectedColor = colors.find(
    (color) => color.name.toLowerCase() === taskData.priority.toLowerCase()
  );

  const [updateTask, setUpdateTask] = useState<UpdateTaskProps>({
    taskId: taskData._id,
    status: taskData.status,
    title: taskData.title,
    description: taskData.description,
    priority: taskData.priority,
    deadline: taskData.deadline,
  });

  const deleteTask = async (id: string) => {
    try {
      if (confirm("Are you sure you want to delete this task?")) {
        const url = `http://localhost:8080/api/v1/task/deletetask/${id}`;
        const res = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth?.token,
          },
        });
        const data = await res.json();
        if (data.success) {
          toast.success(data.message);
          setCallTask(true); // Trigger a task refresh
        }
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <>
      <div 
        className={styles.task} 
        draggable="true" 
        onDragStart={() => setActiveCard(index)} 
        onDragEnd={() => setActiveCard(null)}
      >
        <div className={styles.content}>
          <div className={styles.taskOperation}>
            <p id={styles.title}>{taskData.title}</p>
            <div id={styles.operationIcon}>
              <LuFileEdit id={styles.iconSize1} onClick={() => setUpdatePopup(true)} />
              <LuDelete id={styles.iconSize2} onClick={() => deleteTask(taskData._id)} />
            </div>
          </div>
          <p>{taskData.description}</p>
          {selectedColor && (
            <p id={styles.priority} style={{ backgroundColor: selectedColor.hexcode }}>
              {taskData.priority}
            </p>
          )}
          <div className={styles.deadline}>
            <FiClock />
            <p>{taskData.deadline}</p>
          </div>
          <p id={styles.time}>1hr 20min</p>
        </div>
      </div>

      {updatePopup && (
        <UpdateTask
          updateTask={updateTask}
          setUpdateTask={setUpdateTask}
          setUpdatePopup={setUpdatePopup}
          updatePopup={updatePopup}
        />
      )}
    </>
  );
};

export default TaskComponent;
