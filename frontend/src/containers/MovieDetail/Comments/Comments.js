import React, { useState } from "react";
import { Button, Input, Typography } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import SingleComment from "./Comment/Comment";
import Reply from "./Reply/Reply";

import { COMMENT_SERVER } from "../../../configs";
import classes from "./Comments.module.css";
const { TextArea } = Input;
const { Title } = Typography;
const Comments = (props) => {
  const user = useSelector((state) => state.user);
  const [Comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (user.userData) {
      const variables = {
        content: Comment,
        writer: user.userData._id,
        postId: props.postId,
      };

      axios.post(`${COMMENT_SERVER}/save`, variables).then((response) => {
        if (response.data.success) {
          setComment("");
          props.refreshFunction(response.data.result);
        } else {
          alert("Failed to save Comment");
        }
      });
    } else {
      return alert("Please Log in first");
    }
  };

  return (
    <div>
      <br />
      <Title level={4} style={{ textAlign: "center" }}>
        {" "}
        Share your opinions about {props.movieTitle}
      </Title>
      <hr />
      {props.CommentLists &&
        props.CommentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment key={index}>
                <SingleComment
                  index={index}
                  comment={comment}
                  postId={props.postId}
                  refreshFunction={props.refreshFunction}
                />
                <Reply
                  index={index}
                  CommentLists={props.CommentLists}
                  postId={props.postId}
                  parentCommentId={comment._id}
                  refreshFunction={props.refreshFunction}
                />
              </React.Fragment>
            )
        )}

      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <TextArea
          className={classes.CommentTextArea}
          onChange={handleChange}
          value={Comment}
          placeholder="write some comments"
        />
        <br />
      </form>
      <Button className={classes.CommentBtn} onClick={onSubmit}>
        Comment
      </Button>
    </div>
  );
};

export default Comments;
