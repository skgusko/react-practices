import React, {useState} from 'react';
import * as styles from './assets/scss/TaskList.scss';
import Task from './Task';
import axios from 'axios';
import update from 'react-addons-update';


function TaskList({key, cardNo, toggleData, setToggleData}) {

    const addTask = async (e) => {
        if (e.key == "Enter") {
            try {
                e.preventDefault();
                e.stopPropagation(); // 해당 코드 없을 경우 이벤트 두 번 실행됨 
                
                const card = {
                    name: e.target.value,
                    done: 'N',
                    cardNo: cardNo
                }
                const response = await axios.post('/kanbanboard/task', card);
                const jsonResult = response.data.data;

                setToggleData(prev => update(prev, {
                    tasks : {$set: [jsonResult, ...prev.tasks]}
                }));

                e.target.value = '';
                
            } catch(err) {
                console.error(err.response ? `${err.response.status} ${err.response.data.message}` : err);
            }
        }
    }

    return (
        <div className={styles.Task_List}>
            <ul>
                {
                    toggleData.tasks?.map(task => <Task     
                                        key={task.no}
                                        no={task.no}
                                        name={task.name}
                                        done={task.done}
                                        setToggleData={setToggleData}/>)
                }
            </ul>
            <input 
                className={styles.Input_Add_Task} 
                type='text' 
                placeholder='태스크 추가' 
                onKeyDown={e => addTask(e)}/>
        </div>
    );
}

export default TaskList;