import React from "react";
import Notification from "./notification";

const reserveNotifications = [
    {   
        id:1,
        message: "안녕하세요",
    },
    {
        id:2,
        message: "반가워요",
    },
    {
        id:3,
        message: "하이요",
    },
];

let timer;

class NotificationList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            notifications:[],
        };
    }

    componentDidMount(){
        const {notifications} = this.state;
        timer = setInterval(() =>{
            if(notifications.length < reserveNotifications.length){
                const index = notifications.length;
                notifications.push(reserveNotifications[index]);
                this.setState({ // state 업데이트
                    notifications: notifications,
                });
            } else{
                this.setState({
                    notifications:[],
                })
                clearInterval(timer);
            }
        }, 1000);
    }

    render(){
        return (
            <div>
                {this.state.notifications.map((notification) => {
                    return (
                        <Notification 
                        key={notification.id} // key는 map을 쓸 때 항상 넣어야함
                        id={notification.id}
                        message={notification.message}
                    />
                    );
                })}
            </div>
        )
    }

}

export default NotificationList