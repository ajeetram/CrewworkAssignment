"use client";
import { useState, useEffect } from "react";
import styles from "./task.module.css";
import { FiBarChart, FiClock } from "react-icons/fi";
import toast from "react-hot-toast";
import { useMyContext } from "../context/MyContext";
import { LuFileEdit, LuDelete } from "react-icons/lu";
import UpdateTask from './updateTaskPage';
import Loader from '../Loader/loader';

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

const TaskComponent: React.FC<{ taskData: Task, getTask: () => void, isLoaderActive: boolean }> = ({ taskData, getTask, isLoaderActive }) => {
  const { auth } = useMyContext();
  const [updatePopup, setUpdatePopup] = useState(false);


  const selectedColor = colors.find(
    (color) => color.name.toLowerCase() === taskData.priority.toLowerCase()
  );

  const [updateTask, setUpdateTask] = useState<UpdateTaskProps>({
    taskId:taskData._id,
    status: taskData.status,
    title: taskData.title,
    description: taskData.description,
    priority: taskData.priority,
    deadline: taskData.deadline,
  });

  const deleteTask = async (id: string) => {
    try {
      alert("Are your really want to delete this task ?")
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
        getTask();
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <>
      <div className={styles.task}>
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

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaderActive,setLoaderActive] = useState(true);

  const { auth } = useMyContext();

  const getTask = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const url = `http://localhost:8080/api/v1/task/gettask/${userId}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth?.token,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      if (data) {
        setTasks(data.gettask);
        setLoaderActive(false);
        console.log("task : ", data.gettask);
      }
    } catch (error) {
      toast.error(error.message || error.toString());
    }
  };

  useEffect(() => {
    getTask();
  }, [isLoaderActive]);

  const renderColumn = (status: string) => (
    <div className={styles.column}>
      <div className={styles.status}>
        <p>{status}</p>
        <FiBarChart className={styles.chart} />
      </div>
      {tasks
        .filter((task) => task.status === status)
        .map((taskData, i) => (
          <TaskComponent 
          key={i} 
          taskData={taskData} 
          getTask={getTask}
          isLoaderActive={isLoaderActive}
        
          />
        ))}
    </div>
  );

  return (
    <>
    {
    isLoaderActive?
    <Loader />
    :
    <div className={styles.container}>
      {renderColumn("To do")}
      {renderColumn("In progress")}
      {renderColumn("Under review")}
      {renderColumn("Finished")}
    </div>
    }
    </>
  );
}
