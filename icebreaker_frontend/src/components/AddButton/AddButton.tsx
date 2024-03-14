import React, { useState, useEffect } from "react";
import "./AddButton.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface pathProp {
  path: string;
}

const AddButton = ({ path }: pathProp) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  }
  return (
    <>
      <div className="fab-container">
        <Fab color="primary" aria-label="add" onClick={handleClick} size="large">
          <AddIcon />
        </Fab>
      </div>
    </>
  )
}

export default AddButton;



