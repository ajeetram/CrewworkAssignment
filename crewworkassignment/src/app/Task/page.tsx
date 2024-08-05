"use client";
import { useState, useEffect } from "react";
import styles from "./task.module.css";
import { FiBarChart, FiClock } from "react-icons/fi";
import toast from "react-hot-toast";
import { useMyContext } from "../context/MyContext";
import { LuFileEdit,LuDelete } from "react-icons/lu";

interface Color {
  name: string;
  hexcode: string;
}

interface Task {
  title: string;
  description: string;
  status: string;
  deadline: string;
  priority: string;
}

interface UpdateTask {
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

const TaskComponent = ({ taskData }: { taskData: Task }) => {
  const selectedColor = colors.find(
    (color) => color.name.toLowerCase() === taskData.priority.toLowerCase()
  );

  const [updateTask,setUpdateTask] = useState<UpdateTask>({
    title: "",
    description: "",
    priority: "",
    deadline: "",
  })

  return (
    <div className={styles.task}>
      <div className={styles.content}>
      <div className={styles.taskOperation}>
        <p id={styles.title}>{taskData.title}</p>
        <div id={styles.operationIcon}>
        <LuFileEdit id={styles.iconSize1}/>
        <LuDelete id={styles.iconSize2}/>
        </div>
        </div>
        <p>{taskData.description}</p>
        {selectedColor && (
          <p
            id={styles.priority}
            style={{ backgroundColor: selectedColor.hexcode }}
          >
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
  );
};

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { isVisible, auth } = useMyContext();

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
        console.log("task : ", data.gettask);
      }
    } catch (error) {
      toast.error(error.message || error.toString());
    }
  };

  useEffect(() => {
    getTask();
  },[]);

  const renderColumn = (status: string) => (
    <div className={styles.column}>
      <div className={styles.status}>
        <p>{status}</p>
        <FiBarChart className={styles.chart} />
      </div>
      {tasks
        .filter((task) => task.status === status)
        .map((taskData, i) => (
          <TaskComponent key={i} taskData={taskData} />
        ))}
    </div>
  );

  return (
    <div className={styles.container}>
      {renderColumn("To do")}
      {renderColumn("In progress")}
      {renderColumn("Under review")}
      {renderColumn("Finished")}
    </div>
  );
}
