import React from "react";
import "./FormButton.css";

interface FormButtonProps {
  text: string;
}

const FormButton: React.FC<FormButtonProps> = ({ text }) => {
  return <button className="form-button">{text}</button>;
};

export default FormButton;
