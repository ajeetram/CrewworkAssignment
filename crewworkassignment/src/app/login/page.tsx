"use client"; 
import { useState,ChangeEvent, } from "react";
import styles from "./auth.module.css"
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import toast from "react-hot-toast";
import { useMyContext } from "../context/MyContext";


export default function login() {

  const [seePass,setSeePass] = useState(false); 
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const {auth,setAuth}=useMyContext();
  const router= useRouter();
  
  const login = async(email:string,password:string)=>{

     
    try {
      if(!email || !password)
      {
        return toast.error("Please provide all input details")
      }
      const url = "http://localhost:8080/api/v1/auth/login";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if(res && res.ok)
      {
        toast.success(data.message);
        setAuth({...auth,
          user:data.user,
          token:data.token,
          userId:data?.user?.userId,
        })
        localStorage.setItem("auth", JSON.stringify(data))
        router.push('/dashboard');
      }
      else
      {
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error("something went work !")
    }

  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  return (
    <div className={styles.authcontainer}>
      <div className={styles.authform}>
      <h2>Welcome to <span>Workflo</span>!</h2>
      <div className={styles.formInput}>
          <input type="email" placeholder="Your email" name="email" required onChange={handleEmailChange} />
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
        <button className={styles.submitButton} onClick={() => login(email, password)}>
          Login
        </button>
      <p>Don't have an account? Create a <Link href="/signup">new account</Link>.</p>
      </div>
      
    </div>
  )
}