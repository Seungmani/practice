import Card from "./Car";

function ProfileCard(props) {
    return (
        <div>
            <Card title="SeungMin Lee" backgroundColor="#4ea04e">
                <p>안녕하세요</p>
                <p>저는 리액트를 공부중 입니다.</p>
            </Card>
            <Card title="S" backgroundColor="red">
                <p>안녕하세요</p>
                <p>저는 리액트를 공부중 입니다.</p>
            </Card>
        </div>
    )
}

export default ProfileCard