import React, {useState} from 'react';
import * as styles from './assets/scss/Task.scss';
import axios from 'axios';

function Task({no, name, done, setToggleData}) {

    const [isDone, setIsDone] = useState(done == 'Y' ? true : false);
    
    const checkHandler = async () => {
        try {
            const response = await axios.put(`/kanbanboard/task/${no}`, null, {params: {done: isDone ? 'N' : 'Y'}});

            setIsDone(!isDone);
        } catch(err) {
            console.error(err.response ? `${err.response.status} ${err.response.data.message}` : err);
        }
    }

    const deleteCard = async (no) => {
        try {
            const response = await axios.delete(`/kanbanboard/task/${no}`);
            const jsonResult = response.data;

            setToggleData(prev => ({
                ...prev,
                tasks: prev.tasks.filter(t => t.no != jsonResult.data)
            }))
        } catch(err) {
            console.error(err.response ? `${err.response.status} ${err.response.data.message}` : err);
        }
    }

    return (
        <li className={styles._Task}>
            <input 
                type='checkbox' 
                checked={isDone}
                onChange={checkHandler}
                />
            {name}
            <a 
                href='#' 
                className={styles.Task_Remove}
                onClick={(e) => {
                    e.preventDefault();
                    deleteCard(no); }
                }></a>
        </li>
    );
}

export default Task;