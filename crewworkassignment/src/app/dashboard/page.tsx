"use client";
import { useState } from "react";
import styles from "./dashboard.module.css";
import { LuBellDot, LuLoader, LuSettings } from "react-icons/lu";
import { PiChartLineLight } from "react-icons/pi";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { CiViewBoard } from "react-icons/ci";
import { BiHomeAlt2, BiSolidPlusCircle } from "react-icons/bi";
import { GoPeople } from "react-icons/go";
import Link from "next/link";
import Image from "next/image";
import { IconType } from "react-icons";
import profile from "../../../public/userrofile.png";
import Home from "../home/page";
import Boards from "../Boards/page";
import Settings from "../settings/page";
import { useMyContext } from "../context/MyContext";
import CreateTask from "../createTask/page";
import { useRouter } from "next/navigation";

interface NavLink {
  name: string;
  href: string;
  icon: IconType;
}

export default function Sidebar() {
  const [activeNav, setActiveNav] = useState("Home");

  const { setIsVisible, setAuth, auth } = useMyContext();
  const router = useRouter();

  const navLinks: NavLink[] = [
    { name: "Home", href: "/dashboard", icon: BiHomeAlt2 },
    { name: "Boards", href: "/boards", icon: CiViewBoard },
    { name: "Settings", href: "/settings", icon: LuSettings },
    { name: "Teams", href: "/teams", icon: GoPeople },
    { name: "Analytics", href: "/analytics", icon: PiChartLineLight },
  ];

  const logoutHandler = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
      userId: "",
    });
    localStorage.removeItem("auth");
    router.push("/login");
  };

  return (
    <>
      <div className={styles.dashboard}>
        <div className={styles.sidebarContainer}>
          <div className={styles.sidebarItem}>
            <div className={styles.topSection}>
              <div className={styles.userProfile}>
                <Image
                  src={profile}
                  width="100"
                  height="100"
                  alt="profile"
                  className={styles.profileImage}
                />
                <h4 className={styles.userName}>{auth?.user?.name}</h4>
              </div>
              <div className={styles.iconsContainer}>
                <div className={styles.icons}>
                  <LuBellDot />
                  <LuLoader />
                  <MdKeyboardDoubleArrowRight />
                </div>
                <div>
                  <button
                    className={styles.logoutButton}
                    onClick={logoutHandler}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.bottomSection}>
              {navLinks.map((link, i) => {
                return (
                  <div
                    key={i + 1}
                    className={
                      activeNav === link.name
                        ? styles.navItemActive
                        : styles.navItem
                    }
                    onClick={() => setActiveNav(link.name)}
                  >
                    <link.icon />
                    <Link href={link.href}>{link.name} </Link>
                  </div>
                );
              })}
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
        <div className={styles.contentContainer}>
          {activeNav === "Home" && <Home />}
          {activeNav === "Boards" && <Boards />}
          {activeNav === "Settings" && <Settings />}
        </div>
      </div>
      <CreateTask />
    </>
  );
}
