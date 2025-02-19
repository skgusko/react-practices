import React, {useState} from 'react';
import * as styles from './assets/scss/Card.scss';
import TaskList from './TaskList.js'
import axios from 'axios';
import update from 'react-addons-update';

function Card({cardNo, title, description}) {

    const [toggleData, setToggleData] = useState({
        open: false,
        tasks: null
    });

    const toggleHandler = async (cardNo) => {
        try {
            const response = await axios.get(`/kanbanboard/task`, {params: {cardNo: cardNo}});

            console.log(response.data.data);
            setToggleData(update(toggleData, {
                open: {$set: !toggleData.open},
                tasks: {$set: response.data.data},
            }));

        } catch(err) {
            console.error(err.response ? `${err.response.status} ${err.response.data.message}` : err);
        }
    }

    // toggle 닫기
    const toggleHandlerWithoutReq = async () => {
            setToggleData(update(toggleData, {
                open: {$set: !toggleData.open},
            }));
    }

    return (
        <div className={styles._Card}>
            <div 
                className={`${styles.Card_Title} ${toggleData.open ? styles.Card_Title_Open : styles.Card_Title}`}
                onClick={toggleData.open ? toggleHandlerWithoutReq : () => toggleHandler(cardNo)}>
                {title}
            </div>
        
                    <div>
                        {description}
                        {
                            toggleData.open && (
                            <TaskList 
                                tasks={toggleData.tasks}
                                cardNo={cardNo}
                                toggleData={toggleData}
                                setToggleData={setToggleData}/>
                            )
                        }
                    </div>
            
        </div>
    );
}

export default Card;