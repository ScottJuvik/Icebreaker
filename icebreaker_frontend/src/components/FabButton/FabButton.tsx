import React from "react";
import "./FabButton.css";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddCommentOutlined from "@mui/icons-material/AddCommentOutlined";
import PlayIcon from "../icons/PlayIcon";

interface FabButtonProps {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  icon: string;
}
const FabButton: React.FC<FabButtonProps> = ({ handleClick, icon }) => {
  return (
    <>
      <div className="fab-container">
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleClick}
          size="large"
        >
          {icon === "add" ? <AddIcon /> : null}
          {icon === "review" ? <AddCommentOutlined /> : null}
          {icon === "play" ? <PlayIcon /> : null}
        </Fab>
      </div>
    </>
  );
};

export default FabButton;
