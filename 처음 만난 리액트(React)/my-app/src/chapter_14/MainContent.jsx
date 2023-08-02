// theme context로 부터 설정된 테마 값을 받아와 테마를 변경
import { useContext } from "react";
import ThemeContext from "./Theme";

function MainContext(props){
    const {theme, toggleTheme} = useContext(ThemeContext);

    return(
        <div style={{
            width:"100vh", height : "100vh", padding:"1.5rem",
            backgroundColor: theme == "light" ? "white" : "black",
            color : theme == "light" ? "black" : "white",
        }}>
            <p>안녕하세요! 현재 테마는 {theme}입니다.</p>
            <button onClick={toggleTheme}>테마 변경</button>
        </div>
    )
}

export default MainContext;