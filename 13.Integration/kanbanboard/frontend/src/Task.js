import React, {useState} from 'react';
import * as styles from './assets/scss/Task.scss';

function Task({name, done}) {

    const [isChecked, setIsChecked] = useState(done);
    const controlCheck = () => {
        setIsChecked(!isChecked); // data.js 내 데이터값 변경 필요~!~!
    }

    return (
        <li className={styles._Task}>
            <input 
                type='checkbox' 
                checked={isChecked}
                onChange={controlCheck}
                />
            {name}
            <a href='#' className={styles.Task_Remove}></a>
        </li>
    );
}

export default Task;