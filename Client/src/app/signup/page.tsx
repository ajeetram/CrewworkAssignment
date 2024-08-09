"use client"; // This is a client component
import { useState, ChangeEvent } from "react";
import styles from "../login/auth.module.css";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Logout() {
  const [seePass, setSeePass] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const register = async (name: string, email: string, password: string) => {
    try {
      const url = "http://localhost:8080/api/v1/auth/register";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        toast.success("Register successfully!");
        console.log(res);
      } else {
        toast.error("Registration failed!");
      }
    } catch (error) {
      console.log("error hai: ", error);
      toast.error("An error occurred!");
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <div className={styles.authcontainer}>
      <div className={styles.authform}>
        <h2>
          Welcome to <span>Workflo</span>!
        </h2>
        <div className={styles.formInput}>
          <input
            type="text"
            placeholder="Full name"
            name="name"
            value={name}
            required
            onChange={handleNameChange}
          />
        </div>
        <div className={styles.formInput}>
          <input
            type="email"
            placeholder="Your email"
            name="email"
            required
            onChange={handleEmailChange}
          />
        </div>
        <div className={styles.formInput}>
          <input
            type={seePass ? "text" : "password"}
            placeholder="Password"
            name="password"
            required
            onChange={handlePasswordChange}
          />
          {seePass ? (
            <VscEye onClick={() => setSeePass(false)} />
          ) : (
            <VscEyeClosed onClick={() => setSeePass(true)} />
          )}
        </div>
        <button
          className={styles.submitButton}
          onClick={() => register(name, email, password)}
        >
          Sign up
        </button>
        <p>
          Already have an account? <Link href="/login">Log in</Link>.
        </p>
      </div>
    </div>
  );
}
