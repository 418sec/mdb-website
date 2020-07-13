import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import Axios from "axios";
import { useSelector } from "react-redux";

import { LIKE_SERVER } from "../../../configs";
const LikeDislikes = (props) => {
  const user = useSelector((state) => state.user);

  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);
  let variable = {};

  if (props.video) {
    variable = { videoId: props.videoId, userId: props.userId };
  } else {
    variable = { commentId: props.commentId, userId: props.userId };
  }

  useEffect(() => {
    Axios.post(`${LIKE_SERVER}/getLikes`, variable).then((response) => {
      console.log("getLikes", response.data);
      if (response.data.success) {
        setLikes(response.data.likes.length);

        response.data.likes.map((like) => {
          if (like.userId === props.userId) {
            setLikeAction("liked");
          }
        });
      } else {
        alert("Failed to get likes");
      }
    });

    Axios.post(`${LIKE_SERVER}/getDislikes`, variable).then((response) => {
      console.log("getDislike", response.data);
      if (response.data.success) {
        setDislikes(response.data.dislikes.length);

        response.data.dislikes.map((dislike) => {
          if (dislike.userId === props.userId) {
            setDislikeAction("disliked");
          }
        });
      } else {
        alert("Failed to get dislikes");
      }
    });
  }, []);

  const onLike = () => {
    if (user.userData) {
      if (LikeAction === null) {
        Axios.post(`${LIKE_SERVER}/upLike`, variable).then((response) => {
          if (response.data.success) {
            setLikes(Likes + 1);
            setLikeAction("liked");
            

            if (DislikeAction !== null) {
           
  
              setDislikeAction(null);
              setDislikes(Dislikes - 1);
            }
          } else {
            alert("Failed to increase the like");
          }
        });
      } else {
        Axios.post(`${LIKE_SERVER}/unLike`, variable).then((response) => {
          if (response.data.success) {
            setLikes(Likes - 1);
            setLikeAction(null);
          } else {
            alert("Failed to decrease the like");
          }
        });
      }
    } else {
      props.history.push("/login");
    }
    console.log(Likes)
    console.log(LikeAction)
  };

  const onDislike = () => {
    if (user.userData) {
      if (DislikeAction !== null) {
        Axios.post(`${LIKE_SERVER}/unDisLike`, variable).then((response) => {
          if (response.data.success) {
            setDislikes(Dislikes - 1);
            setDislikeAction(null);
          } else {
            alert("Failed to decrease dislike");
          }
        });
      } else {
        Axios.post(`${LIKE_SERVER}/upDisLike`, variable).then((response) => {
          if (response.data.success) {
            setDislikes(Dislikes + 1);
            setDislikeAction("disliked");

            //If dislike button is already clicked
            if (LikeAction !== null) {
              setLikeAction(null);
              setLikes(Likes - 1);
            }
          } else {
            alert("Failed to increase dislike");
          }
        });
      }
    } else {
      props.history.push("/login");
    }
  };

  return (
    <React.Fragment>
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <button onClick={onLike}>
            {LikeAction === "liked" ? "Liked" : "Like"}
            <span style={{ paddingLeft: "8px", cursor: "pointer" }}>{Likes}</span>
          </button>
        </Tooltip>
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span key="comment-basic-dislike">
        <Tooltip title="Dislike">
          <button onClick={onDislike}>
            {DislikeAction === "disliked" ? "Disliked" : "Dislike"}
            <span style={{ paddingLeft: "8px", cursor: "auto" }}>
              {Dislikes}
            </span>
          </button>
        </Tooltip>
      </span>
    </React.Fragment>
  );
};

export default LikeDislikes;
