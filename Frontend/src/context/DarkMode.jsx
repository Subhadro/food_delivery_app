import React, { createContext, useContext, useState } from 'react';

const DarkContext = createContext();

export const DarkModeProvider = ({ children }) => {
    const [dark, setDark] = useState(false);


    return (
        <DarkContext.Provider value={{ dark, setDark }}>
            {children}
        </DarkContext.Provider>
    );
};

export const useDark = () => useContext(DarkContext);
