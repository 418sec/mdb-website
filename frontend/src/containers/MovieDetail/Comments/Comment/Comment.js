import React, { useState } from "react";
import { Comment, Avatar, Button, Input } from "antd";
import Axios from "axios";
import { useSelector } from "react-redux";
import Like from "../../Like/Like";

import classes from "./Comment.module.css";
import { COMMENT_SERVER } from "../../../../configs";
const { TextArea } = Input;
const SingleComment = (props) => {
  const user = useSelector((state) => state.user);
  const [commentValue, setCommentValue] = useState("");
  const [OpenReply, setOpenReply] = useState(false);

  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const openReply = () => {
    setOpenReply(!OpenReply);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = {
      writer: user.userData._id,
      postId: props.postId,
      responseTo: props.comment._id,
      content: commentValue,
    };

    Axios.post(`${COMMENT_SERVER}/save`, formData).then((response) => {
      if (response.data.success) {
        setCommentValue("");
        setOpenReply(!OpenReply);
        props.refreshFunction(response.data.result);
      } else {
        alert("Failed to save Comment");
      }
    });
  };

  const actions = [
    <Like
      comment
      commentId={props.comment._id}
      userId={localStorage.getItem("userId")}
    />,
    <span onClick={openReply} key="comment-basic-reply-to" style={{color: 'black'}}>
      Reply to{" "}
    </span>,
  ];

  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} alt="image" />}
        content={<p>{props.comment.content}</p>}
      />

      {OpenReply && (
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
          <TextArea
            className={classes.CommentTextArea}
            onChange={handleChange}
            value={commentValue}
            placeholder="Write Some Comments"
          />
          <br />
          <Button className={classes.ReplyBtn} onClick={onSubmit}>
            Reply
          </Button>
        </form>
      )}
    </div>
  );
};

export default SingleComment;
