import React, {useState, useEffect} from 'react';
import CardList from './CardList';
import './assets/scss/KanbanBoard.scss';
import axios from 'axios';

function KanbanBoard() {
    const [cards, setCards] = useState(null);

    const fetchCards = async () => {
        try {
            const response = await axios.get('/kanbanboard');
            
            const result = response.data.data;
            setCards(result);

        } catch(err) {
            console.error(err.response ? `${err.response.status} ${err.response.data.message}` : err);
        }
    }

    useEffect(() => {
        fetchCards();
    }, []);

    return (
            <div className={"Kanban_Board"}>
                {cards && (
                    <>
                        <CardList 
                            key={'TODO'}
                            title={'To Do'}
                            cards={cards.filter(card => card.status === 'ToDo')}/>
                        <CardList 
                            key={'Doing'}
                            title={'Doing'}
                            cards={cards.filter(card => card.status === 'Doing')}/>
                        <CardList 
                            key={'Done'}
                            title={'Done'}
                            cards={cards.filter(card => card.status === 'Done')}/>
                    </>
                )}
            </div>
        
    );
}

export default KanbanBoard;