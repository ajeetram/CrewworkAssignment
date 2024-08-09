import React, { useState, useEffect } from "react";
import styles from "./task.module.css";
import { FiBarChart } from "react-icons/fi";
import toast from "react-hot-toast";
import { useMyContext } from "../context/MyContext";
import Loader from '../Loader/loader';
import DropArea from './dropArea';
import TaskComponent from './TaskComponent';
import { onDragUpdateList } from './../../../../Backend/controller/taskCreateController';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  deadline: string;
  priority: string;
}

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaderActive, setLoaderActive] = useState(true);
  const { auth, callTask, setCallTask } = useMyContext();
  const [activeCard, setActiveCard] = useState<number | null>(null);

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
        setCallTask(false);
        console.log("task : ", data.gettask);
      }
    } catch (error) {
      toast.error(error.message || error.toString());
    }
  };

  const onDragUpdateList = async(status,taskId)=>{
    try
    {
      const url = `http://localhost:8080/api/v1/task/updateOnDrageDrop/${taskId}`;

      const res = await fetch(url,{
        method: "PUT",
        body: JSON.stringify({
          status:status
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: auth?.token,
        },
      })
    }
    catch(error)
    {
      console.log("error in drage and drop updating list ",error);
    }
  }

  useEffect(() => {
    getTask();
  }, [callTask, isLoaderActive]);

  const onDrop = (status: string, position: number) => {
    if (activeCard === null || activeCard === undefined) return;

    const taskToMove = tasks[activeCard];
    const updatedTasks = tasks.filter((task, index) => index !== activeCard);
    updatedTasks.splice(position, 0, {
      ...taskToMove,
      status: status,
    });
    console.log("updated Task", taskToMove);
    setTasks(updatedTasks);
    onDragUpdateList(status,taskToMove._id);
  };

  const renderColumn = (status: string) => (
    <div className={styles.column}>
      <div className={styles.status}>
        <p>{status}</p>
        <FiBarChart className={styles.chart} />
      </div>
      <DropArea onDrop={() => onDrop(status, 0)} />
      {tasks
        .map((taskData, i) =>
          taskData.status === status && (
            <React.Fragment key={i}>
              <TaskComponent
                taskData={taskData}
                getTask={getTask}
                setCallTask={setCallTask}
                setActiveCard={setActiveCard}
                index={i}
              />
              <DropArea onDrop={() => onDrop(status, i)} />
            </React.Fragment>
          )
        )}
    </div>
  );

  return (
    <>
      {isLoaderActive ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          {renderColumn("To do")}
          {renderColumn("In progress")}
          {renderColumn("Under review")}
          {renderColumn("Finished")}
        </div>
      )}
    </>
  );
}
