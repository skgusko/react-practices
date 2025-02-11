import React from 'react';
import GroceryItem from './GroceryItem';

function GroceryList({groceries}) {
    // const groceryItems = [];
    // groceries.forEach(grocery => {
    //     groceryItems.push(<GroceryItem name={grocery.name} count={grocery.count}/>)
    // });

    return (
        <ol className={"grocery-list"}>
            {
                groceries.map((grocery) => <GroceryItem 
                                            key={index}
                                            name={grocery.name} 
                                            count={grocery.count}/> )
            }
        </ol>
    );
}

export default GroceryList;