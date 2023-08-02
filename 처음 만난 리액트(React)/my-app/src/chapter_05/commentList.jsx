import Comment from "./comment";
import React from "react";

const comments=[
    {
        name : "x",
        comment : "xx",
    },
    {
        name : "y",
        comment : "yy",
    },
    {
        name : "z",
        comment : "zz",
    },
]

function CommentList(props) {
    return (
        <div>
            {comments.map((comment) => {
                return(
                    <Comment name={comment.name} comment={comment.comment}/>
                );
            })}
        </div>
    )
} 

export default CommentList