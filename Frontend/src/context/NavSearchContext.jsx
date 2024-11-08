// FoodItemContext.jsx
import React, { createContext, useState, useContext } from 'react';

const NavSearchContext = createContext();

export const NavSearchProvider = ({ children }) => {
    const [searchVal, setSearchVal] = useState('');

    return (
        <NavSearchContext.Provider value={{ searchVal, setSearchVal }}>
            {children}
        </NavSearchContext.Provider>
    );
};

export const useNavSearchContext = () => useContext(NavSearchContext);
