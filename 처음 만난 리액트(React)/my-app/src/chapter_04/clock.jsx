import React from "react";

function Clock(props){
    return(
        <div>
            <h2>현재 시간: {new Date().toLocaleTimeString()}</h2>
        </div>
    )
}

export default Clock;