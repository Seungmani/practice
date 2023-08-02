function Card(props){
    const {title, backgroundColor, children} = props;

    return(
        <div style={{
            margin : 8, padding :8, borderRadius :8,
            boxShadow : "8px 8px 4px grey", backgroundColor : backgroundColor || "white",
        }}>
            {title && <h1>{title}</h1>} {/* specialization */}
            {children} {/* containment */}
        </div>
    );
}

export default Card;