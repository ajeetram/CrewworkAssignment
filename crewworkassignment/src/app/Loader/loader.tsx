import React from "react";
import styles from './loader.module.css'
const BouncingLoader = () => {
  return (
    <div className={styles.dotLoader}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default BouncingLoader;