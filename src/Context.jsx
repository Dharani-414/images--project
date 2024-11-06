import {Children, createContext, useContext, useState } from "react";
import React from "react";

//create context
export const AppContext = createContext();

//2.provider

const getInitialMode =() => {
  const preferDarkMode=  window.matchMedia("(prefers-color-scheme:dark)").match;
  
const storeDarkMode = localStorage.getItem("darkTheme");
    if(storeDarkMode === null) {
        return preferDarkMode;
    }
     return storeDarkMode === "true";
};

 

export const AppProvider = ({children}) =>{
   const [isDarkTheme,setIsDarkTheme] = useState(getInitialMode());
//
const [searchItem,setSearchItem] = useState("cat");

   const toggleDarkTheme =()=> {
      const newDarkTheme = ! isDarkTheme;
      setIsDarkTheme(newDarkTheme);
      localStorage.setItem('darkTheme',newDarkTheme);
   };
   document.body.classList.toggle("dark-theme");

    return(
        <AppContext.Provider value={{isDarkTheme,toggleDarkTheme,searchItem,setSearchItem}}>
            {children}
        </AppContext.Provider>
    )
}
  export const useGlobalContext =() =>{
    return useContext (AppContext);
  }