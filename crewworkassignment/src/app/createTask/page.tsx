"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./createTask.module.css";
import { useMyContext } from "../context/MyContext";
import { LuLoader, LuExpand, LuMinimize2 } from "react-icons/lu";
import { GoPencil, GoShareAndroid } from "react-icons/go";
import { MdOutlineDateRange } from "react-icons/md";
import { BsExclamationDiamond } from "react-icons/bs";
import { BiSolidPlusCircle } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { CiStar } from "react-icons/ci";
import toast from "react-hot-toast";

interface Task {
  status: string;
  title: string;
  description: string;
  priority: string;
  deadline: string;
  userId: string;
}

const CreateTask: React.FC = () => {
  const { isVisible, setIsVisible, auth } = useMyContext();
  const [isFullscr, setFullscr] = useState<boolean>(false);
  const [task, setTask] = useState<Task>({
    status: "Not selected",
    title: "",
    description: "",
    priority: "Not selected",
    deadline: "",
    userId: auth?.userId,
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (task.status === "Not selected" || task.priority === "Not selected") {
        return toast.error("Please select an option");
      }
      const response = await fetch(
        "http://localhost:8080/api/v1/task/createtask",
        {
          method: "POST",
          body: JSON.stringify(task),
          headers: {
            "Content-Type": "application/json",
            Authorization: auth?.token,
          },
        }
      );

      if (response.ok) {
        const createdTask = await response.json();
        toast.success("Task created successfully");
        setTask({
          status: "To do",
          title: "",
          description: "",
          priority: "Low",
          deadline: "",
          userId: auth?.userId, 
        });
        setIsVisible(false);
      } else {
        toast.error("Failed to create task");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error while creating task!");
    }
  };

  const openPopup = () => {
    setIsVisible(true);
  };

  const closePopup = () => {
    setIsVisible(false);
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.popup} ${isVisible ? styles.show : ""} ${
          !isVisible && styles.hide
        } ${isFullscr ? styles.fullscr : ""}`}
      >
        <div className={styles.topbar}>
          <div id={styles.rightItem}>
            <RxCross2 id={styles.iconSize} onClick={closePopup} />
            {!isFullscr ? (
              <LuExpand id={styles.iconSize} onClick={() => setFullscr(true)} />
            ) : (
              <LuMinimize2
                id={styles.iconSize}
                onClick={() => setFullscr(false)}
              />
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
        <form onSubmit={handleSubmit}>
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
                  <LuLoader />
                  <p>Status</p>
                </div>
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
                    name="status"
                    value={task.status}
                    onChange={handleChange}
                  >
                    <option value="">----Not selected----</option>
                    <option value="To do">To do</option>
                    <option value="In progress">In progress</option>
                    <option value="Under review">Under review</option>
                    <option value="Finished">Finished</option>
                  </select>
                </div>
                <div id={styles.optionData}>
                  <select
                    id={styles.inputData}
                    name="priority"
                    value={task.priority}
                    onChange={handleChange}
                  >
                    <option value="">----Not selected----</option>
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
                    placeholder="write here..."
                    value={task.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button className={styles.submitBtn}>Done</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
