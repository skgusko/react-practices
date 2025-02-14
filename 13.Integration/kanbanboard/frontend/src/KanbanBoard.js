import React, {useState} from 'react';
import CardList from './CardList';
import './assets/scss/KanbanBoard.scss';
import data from './assets/json/data';

function KanbanBoard() {
    const [cards, setCards] = useState(data);

    return (
        <div className={"Kanban_Board"}>
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
        </div>
    );
}

export default KanbanBoard;