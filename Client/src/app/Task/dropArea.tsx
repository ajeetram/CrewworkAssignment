
import { useState } from 'react';
import styles from './task.module.css';

const DropArea = ({onDrop})=>{
    const [showDrop , setShowDrop] = useState(false);
    return(
        <section
        onDragEnter={()=>setShowDrop(true)}
        onDragLeave={()=>setShowDrop(false)}
        onDrop={()=>{
            onDrop();
            setShowDrop(false);
        }}
        onDragOver = {(e)=>e.preventDefault()}
        className={showDrop ? styles.dropArea : styles.hideDropArea}
        >
            Drop here
        </section>
    )
}

export default DropArea;