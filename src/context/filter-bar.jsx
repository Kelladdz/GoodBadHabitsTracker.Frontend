import React, { createContext, useState } from 'react';
import { ORDER_OPTIONS } from '../constants/order-options';

const FilterBarContext = createContext();

function FilterBarProvider({children}) {
    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [orderOption, setOrderOption] = useState(ORDER_OPTIONS[0]);

    const toggleSearchBar = (flag) => {
        setIsSearchBarOpen(flag);
    }

    const changeSearchString = (value) => {
        setSearchString(value.toLowerCase());
    }

    const changeOrderOption = (number) => {
        setOrderOption(ORDER_OPTIONS[number]);
    }

        return <FilterBarContext.Provider value={{
            isSearchBarOpen, toggleSearchBar,
            searchString, changeSearchString,
            orderOption, changeOrderOption}}>
			{children}
			</FilterBarContext.Provider>;
} 

export { FilterBarProvider };
export default FilterBarContext;