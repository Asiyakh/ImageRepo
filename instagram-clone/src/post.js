import React from 'react'
import "./post.css"
import Avatar from "@material-ui/core/Avatar";

function Post({ username, caption, imageURL }) {
    return (
        <div className="post">
            <div className="post__Header">
                <Avatar 
                    className="post__Avatar"
                    alt={username}
                    src="/static/images/avatar/1.jpg"
                />
                <h3>{username}</h3>
            </div>

            <img className="post__Image" src={imageURL}/>
            
            <h4 className="post__Text"><strong>{username}</strong> {caption}</h4>
        </div>
    )

    }
export default Post
