import React, {useState} from 'react';

import type { Item } from '../interfaces/Item';
import ItemList from './ItemList';
import ItemInputForm from './ItemInputForm';

interface ItemListProps {
    items: Item[] | null;
    tripId: number;
}

const Backpack: React.FC<ItemListProps> = ({ items, tripId }) => {
    const [backpackItems, setBackpackItems] = useState<Item[]>(items || []);

    // Function to add a new item to the backpack
    const addItem = (newItem: Item) => {
        setBackpackItems([...backpackItems, newItem]);
    };

    return (
        <>
            <div className="collapse mt-3" id="collapseExample">
                <ul className="list-group my-1">
                    <li className="list-group-item">
                        <h6>Drinks</h6>
                        <ItemList items={items ? items.filter(item => item.category === "drinks") : []}/>
                    </li>
                    <li className="list-group-item">
                        <h6>Food</h6>
                        <ItemList items={items ? items.filter(item => item.category === "food") : []}/>
                    </li>
                    <li className="list-group-item">
                        <h6>Cloths</h6>
                        <ItemList items={items ? items.filter(item => item.category === "cloths") : []}/>
                    </li>
                    <li className="list-group-item">
                        <h6>Tools</h6>
                        <ItemList items={items ? items.filter(item => item.category === "tools") : []}/>
                    </li>
                </ul>

                <ItemInputForm addItem={addItem} newItemId={items?items.length:0} tripId={tripId}/>
            </div>
        </>
    );
};

export default Backpack;