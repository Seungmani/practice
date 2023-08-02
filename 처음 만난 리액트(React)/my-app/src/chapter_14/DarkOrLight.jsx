// theme context 값을 자식 component가 사용 가능하게 함
import { useState, useCallback } from "react";
import ThemeContext from "./Theme";
import MainContext from "./MainContent";

function DarkOrLight (props){
    const [theme, setTheme] = useState("light");

    const toggleTheme = useCallback(() =>{
        if(theme === "light") {
            setTheme("dark");
        } else{
            setTheme("light");
        }
    }, [theme])

    return(
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            <MainContext />
        </ThemeContext.Provider>
    )
}

export default DarkOrLight