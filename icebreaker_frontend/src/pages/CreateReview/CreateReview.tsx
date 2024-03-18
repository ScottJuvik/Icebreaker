import { Timestamp, addDoc, collection } from "firebase/firestore";
import Navbar from "../../components/Navbar/Navbar";
import { auth, db } from "../../firebase/firebaseConfig";
import "./CreateReview.css";
import { serverTimestamp } from "firebase/firestore";
import FormComponent from "../../components/FormComponent/FormComponent";
import { useNavigate, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { getLoggedIn, getLoggedInId } from "../../api/LoggedInAPI";
import { ReviewData } from "../../types/DatabaseTypes";
import { addReview } from "../../api/ReviewAPI";

const CreateReview = () => {
  //TODO: Add support for numerical rating.
  const { activityId } = useParams();
  const navigate = useNavigate();
  async function postReview(formData: Record<string, string>) {
    if (!getLoggedIn()) throw new Error("Login required");

    const review: ReviewData = {
      id: "",
      title: formData["title"],
      description: formData["description"],
      activityId: activityId || "",
      creatorId: getLoggedInId() || "",
      rating: parseInt(formData["rating"]),
      dateCreated: Timestamp.now(),
    };

    addReview(review);
    navigate("../" + activityId);
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
      category: "stars",
      name: "rating",
      label: "rating",
      type: "number",
      required: true,
    },
  ];
  return (
    <>
      <Navbar />
      <div className="content-container">
        <h2 className="header">Create Review:</h2>
        <FormComponent fields={fields} onSubmit={postReview} />
      </div>
    </>
  );
};

export default CreateReview;
