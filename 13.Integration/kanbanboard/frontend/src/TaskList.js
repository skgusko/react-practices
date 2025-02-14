import React from 'react';
import * as styles from './assets/scss/TaskList.scss';
import Task from './Task';

function TaskList({tasks}) {
    return (
        <div className={styles.Task_List}>
            <ul>
                {
                    tasks.map(task => <Task 
                                        key={task.no}
                                        no={task.no}
                                        name={task.name}
                                        done={task.done}/>)
                }
            </ul>
            <input className={styles.Input_Add_Task} type='text' placeholder='태스크 추가' />
        </div>
    );
}

export default TaskList;