import React, { useState, createContext } from 'react'
import { Item } from '../constants'
import { v4 as uuidv4 } from 'uuid';

const ItemDefaultValue: Item = {
    id: uuidv4(),
    setId: null,
    label: 'Nombre',
    setLabel: null,
    optionId: 'plsql',
    setOptionId: null,
    content: '',
    setContent: null,
    contentTarget: '',
    setContentTarget: null,
}

export const ItemContext = createContext<Item>(ItemDefaultValue);

type ChildrenProps = {
    children: React.ReactNode;
    item?: Item;
};

export const ItemContextProvider = ({ children, item }: ChildrenProps) => {
    const [id, setId] = useState((item ? item : ItemDefaultValue).id);
    const [label, setLabel] = useState((item ? item : ItemDefaultValue).label);
    const [optionId, setOptionId] = useState((item ? item : ItemDefaultValue).optionId);
    const [content, setContent] = useState((item ? item : ItemDefaultValue).content);
    const [contentTarget, setContentTarget] = useState((item ? item : ItemDefaultValue).contentTarget);

    return (
        <ItemContext.Provider value={{ id, setId, label, setLabel, optionId, setOptionId, content, setContent, contentTarget, setContentTarget }}>
            {children}
        </ItemContext.Provider>
    );
};
