"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from '../createTask/createTask.module.css';
import { useMyContext } from "../context/MyContext";
import { LuLoader, LuExpand, LuMinimize2 } from "react-icons/lu";
import { GoPencil, GoShareAndroid } from "react-icons/go";
import { MdOutlineDateRange } from "react-icons/md";
import { BsExclamationDiamond } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { CiStar } from "react-icons/ci";
import toast from "react-hot-toast";

interface Task {
  taskId: string;
  status: string;
  title: string;
  description: string;
  priority: string;
  deadline: string;
}

interface UpdateTaskPageProps {
  updateTask: Task;
  setUpdateTask: React.Dispatch<React.SetStateAction<Task>>;
  setUpdatePopup: React.Dispatch<React.SetStateAction<boolean>>;
  updatePopup: boolean;
}

const UpdateTaskPage: React.FC<UpdateTaskPageProps> = ({
  updateTask,
  setUpdateTask,
  setUpdatePopup,
  updatePopup,
}) => {
  const { auth } = useMyContext();
  const [isFullscr, setFullscr] = useState<boolean>(false);
  const [task, setTask] = useState<Task>({
    taskId: updateTask.taskId,
    status: updateTask.status,
    title: updateTask.title,
    description: updateTask.description,
    priority: updateTask.priority,
    deadline: updateTask.deadline,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const toastId = toast.loading("Please wait...");
      const res = await fetch(
        `http://localhost:8080/api/v1/task/updatetask/${task.taskId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            title: task.title,
            description: task.description,
            priority: task.priority,
            deadline: task.deadline,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: auth?.token || "",
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.dismiss(toastId);
        toast.success("Task updated successfully");
        setUpdatePopup(false);
      } else {
        toast.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error in task update! " + (error as Error).message);
    }
  };

  const openPopup = () => {
    setUpdatePopup(true);
  };

  const closePopup = () => {
    setUpdatePopup(false);
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.popup} ${updatePopup ? styles.show : ""} ${
          !updatePopup && styles.hide
        } ${isFullscr ? styles.fullscr : ""}`}
      >
        <div className={styles.topbar}>
          <div id={styles.rightItem}>
            <RxCross2 id={styles.iconSize} onClick={closePopup} />
            {!isFullscr ? (
              <LuExpand id={styles.iconSize} onClick={() => setFullscr(true)} />
            ) : (
              <LuMinimize2 id={styles.iconSize} onClick={() => setFullscr(false)} />
            )}
          </div>
          <div id={styles.leftItem}>
            <div id={styles.iconbtn}>
              <p>Share</p>
              <GoShareAndroid id={styles.iconSize} />
            </div>
            <div id={styles.iconbtn}>
              <p>Favorite</p>
              <CiStar id={styles.iconSize} />
            </div>
          </div>
        </div>
        <form onSubmit={handleUpdateSubmit}>
          <div className={styles.content}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={task.title}
              onChange={handleChange}
              required
            />
            <div className={styles.taskBar}>
              <div className={styles.taskData}>
                <div id={styles.dataName}>
                  <BsExclamationDiamond />
                  <p>Priority</p>
                </div>
                <div id={styles.dataName}>
                  <MdOutlineDateRange />
                  <p>Deadline</p>
                </div>
                <div id={styles.dataName}>
                  <GoPencil />
                  <p>Description</p>
                </div>
              </div>
              <div className={styles.taskData}>
                <div id={styles.optionData}>
                  <select
                    id={styles.inputData}
                    name="priority"
                    value={task.priority}
                    onChange={handleChange}
                  >
                    <option value="">----Select Priority----</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
                <div id={styles.inputData}>
                  <input
                    type="date"
                    name="deadline"
                    value={task.deadline}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div id={styles.inputData}>
                  <textarea
                    name="description"
                    placeholder="Write here..."
                    value={task.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button className={styles.submitBtn}>Update Task</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTaskPage;
