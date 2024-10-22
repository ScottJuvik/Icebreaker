import { Activity } from "../../types/Types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ExpandedActivity.css";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { getFavorite, updateFavorite } from "../../api/FavoriteAPI";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import {
  LinkedinShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from "react-share";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import { useParams } from "react-router-dom";
import { getLoggedIn, getLoggedInId } from "../../api/LoggedInAPI";
import RatingField from "../Rating/RatingField";
import AddIcon from "@mui/icons-material/Add";
import PopupMenu, { PopupMenuItem } from "../Menu/PopupMenu";
import { QueueData } from "../../types/DatabaseTypes";
import { addToQueue, getQueue, getQueueDatas } from "../../api/QueuesAPI";
import { MenuItemProps } from "@mui/base";
import Rating from "../Rating/Rating";

function ExpandedActivity(params: Activity) {
  const { activityId } = useParams();
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [isFavorite, setFavorite] = useState<boolean>(false);
  const [queues, setQueues] = useState<PopupMenuItem[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(getLoggedIn());
    getFavorite(params.id).then((value) => {
      setFavorite(value);
    });
    getQueueDatas(getLoggedInId()).then((queues) => {
      setQueues(
        queues.map((queue) => ({
          text: queue.title,
          onClick: () => {
            addToQueue(queue.id, params.id);
          },
        }))
      );
    });
  }, []);

  const handleFavorite = () => {
    updateFavorite(params.id, !isFavorite);
    setFavorite(!isFavorite);
  };

  return (
    <div className="expanded-activity">
      <div className="expanded-activity">
        {isLoggedIn && (
          <div className="activity-actions">
            {queues.length > 0 && <PopupMenu menuItems={queues} />}
            <FlagOutlinedIcon className="report-btn" />
          </div>
        )}

        <div className="activity_element">
          <div className="header-container">
            <h1>{params.title}</h1>
            {isLoggedIn && (
              <input
                checked={isFavorite}
                onClick={handleFavorite}
                type="checkbox"
                className="activity_checkbox"
              />
            )}
          </div>
          <p id="user_text">Opprettet av: {params.creator.name}</p>
          <p>Beskrivelse: {params.description}</p>
          <Rating rating={params.rating} maxRating={5} />
        </div>
      </div>
      <div className="socials">
        <TwitterShareButton url={"www.icebreaker.no/" + activityId}>
          <XIcon />
        </TwitterShareButton>
        <FacebookShareButton url={"www.icebreaker.no/" + activityId}>
          <FacebookIcon />
        </FacebookShareButton>
        <LinkedinShareButton url={"www.icebreaker.no/" + activityId}>
          <LinkedInIcon />
        </LinkedinShareButton>
      </div>
    </div>
  );
}

export default ExpandedActivity;
