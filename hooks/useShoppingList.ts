import { Pallete } from "@/constants/Colors";
import { useState, useMemo } from "react";

export type ItemProp = {
    id: string,
    name: string,
    marked: boolean,
    color: string,
    price: number
}

const initialDataSource: ItemProp[] = [
    {
        id: generateId(),
        name: "Oranges",
        marked: false,
        color: Pallete.yellow,
        price: 1.29
    },
    {
        id: generateId(),
        name: "Tomatoes",
        marked: false,
        color: Pallete.red,
        price: 1.99
    },
    {
        id: generateId(),
        name: "Apples",
        marked: false,
        color: Pallete.green,
        price: 1.49
    },
    {
        id: generateId(),
        name: "Bananas",
        marked: false,
        color: Pallete.yellow,
        price: 0.99
    },
    {
        id: generateId(),
        name: "Chicken Breast",
        marked: false,
        color: Pallete.yellow,
        price: 5.99
    },
    {
        id: generateId(),
        name: "Spinach",
        marked: false,
        color: Pallete.green,
        price: 2.50
    }
];

/**
 * I have no idea how it works under the hood,
 * it's a simple copy paste
 */
export function generateId(): string {
    return Math.random().toString(36).substring(2,9)
}

export default function useShoppingList() {
    const [items, setItems] = useState(initialDataSource)
    const [filter, setFilter] = useState("") 

    const filteredItems  = useMemo(() => {
        const lowerCaseFilter = filter.toLowerCase()
        return items.filter(item => item.name.toLowerCase().includes(lowerCaseFilter));
    }, [items, filter]);

    const totalPrice = useMemo(() => {
        const sum = items.reduce((sum, item) => sum + item.price, 0)
        return sum.toLocaleString('en-US', { 
            minimumFractionDigits: 2, maximumFractionDigits: 2 
        })
    }, [items]);

    const addItem = (newItem: ItemProp) => {
        console.log("recreating addItem");
        setItems((prev) => [newItem, ...prev])
    }

    const deleteItem = (id: string) => {
        setItems((prev) => {
            const updated = prev.filter(item => item.id !== id);
            return updated
        });
    }

    const selectItem = (index: number, selected: boolean) => {
        setItems((prev) => {
            const updated = [...prev]
            updated[index] = {...updated[index], marked: selected }
            return updated
        })
    }

    return { items : filteredItems, filter, totalPrice, addItem, deleteItem, selectItem, setFilter }
}