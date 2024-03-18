import { addDoc, collection, doc, Firestore, setDoc } from "firebase/firestore";
import Navbar from "../../components/Navbar/Navbar";
import { auth, db } from "../../firebase/firebaseConfig";
import "./CreateActivity.css";
import { serverTimestamp } from "firebase/firestore";
import FormComponent from "../../components/FormComponent/FormComponent";
import { ActivityData } from "../../types/DatabaseTypes";
import { addActivity } from "../../api/ActivitiesAPI";

import { Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router";
import { getLoggedIn, getLoggedInId } from "../../api/LoggedInAPI";
const CreateActivity = () => {
  const navigate = useNavigate();
  async function postActivity(formData: Record<string, string>) {
    if (!getLoggedIn()) throw new Error("Login required");

    const activity: ActivityData = {
      id: "",
      title: formData["title"],
      description: formData["description"],
      categoryId: formData["category"],
      creatorId: getLoggedInId(),
      dateCreated: Timestamp.now(),
    };
    addActivity(activity);
    navigate("../");
  }

  const fields = [
    {
      category: "input",
      name: "title",
      label: "title",
      type: "text",
      required: true,
    },
    {
      category: "textarea",
      name: "description",
      label: "description",
      type: "text",
      required: true,
    },
    {
      category: "input",
      name: "category",
      label: "category",
      type: "text",
      required: true,
    },
  ];
  return (
    <>
      <Navbar />
      <div className="content-container">
        <h2 className="header">Create Activity:</h2>
        <FormComponent fields={fields} onSubmit={postActivity} />
      </div>
    </>
  );
};

export default CreateActivity;
