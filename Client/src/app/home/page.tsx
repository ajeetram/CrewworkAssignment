import styles from "./home.module.css";
import { GoQuestion, GoShareAndroid } from "react-icons/go";
import { CiSearch, CiFilter } from "react-icons/ci";
import { MdOutlineDateRange } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { BiSolidPlusCircle } from "react-icons/bi";
import Task from "../Task/page";
import { useMyContext } from "../context/MyContext";

export default function home() {
  const { setIsVisible, auth } = useMyContext();

  return (
    <div>
      <div className={styles.greeting}>
        <h2>Good morning, {auth?.user?.name}</h2>
        <div id={styles.icon}>
          Help & feedback
          <GoQuestion />
        </div>
      </div>
      <div className={styles.features}>
        <div className={styles.featuresIntro}>
          <span>Introducing tags </span>
          <p>
            Easily categorize and find your notes by adding tags. Keep your
            workspace clutter-free and efficient
          </p>
        </div>
        <div className={styles.featuresIntro}>
          <span>Share Notes Instantly </span>
          <p>
            Effortlessly share your notes with others via email or link. Enhance
            collaboration with quick sharing options.
          </p>
        </div>
        <div className={styles.featuresIntro}>
          <span>Access Anywhere </span>
          <p>
            sync your notes across all devices. Stay productive whether you're
            on your phone,tablet,or computer
          </p>
        </div>
      </div>
      <div className={styles.functionalitybar}>
        <div className={styles.searchBar}>
          <input type="text" placeholder="Search" />
          <CiSearch />
        </div>
        <div className={styles.methods}>
          <div className={styles.item}>
            <p>Calender view </p>
            <MdOutlineDateRange />
          </div>
          <div className={styles.item}>
            <p>Automation</p>
            <BsStars />
          </div>
          <div className={styles.item}>
            <p>Filter</p>
            <CiFilter />
          </div>
          <div className={styles.item}>
            <p>Share </p>
            <GoShareAndroid />
          </div>
          <div className={styles.item}>
            <button
              className={styles.createTaskBtn}
              onClick={() => setIsVisible(true)}
            >
              Create New Task{" "}
              <BiSolidPlusCircle id={styles.createTaskBtnIcon} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.todoboard}>
        <Task />
      </div>
    </div>
  );
}
