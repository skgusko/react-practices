import React, {useState} from 'react';
import * as styles from './assets/scss/Card.scss';
import TaskList from './TaskList.js'

function Card({title, description, tasks}) {

    const [isOpen, setIsOpen] = useState(true);

    const openToggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className={styles._Card}>
            <div 
                className={`${styles.Card_Title} ${isOpen ? styles.Card_Title_Open : styles.Card_Title}`}
                onClick={openToggle}>
                {title}
            </div>

            {
                isOpen && 
                    <div>
                        {description}
                        <TaskList 
                            key={tasks.no}
                            tasks={tasks}/>
                    </div>
            }
            
        </div>
    );
}

export default Card;