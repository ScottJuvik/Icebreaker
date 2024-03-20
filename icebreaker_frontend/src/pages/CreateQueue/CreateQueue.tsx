import { Timestamp, addDoc, collection } from "firebase/firestore";
import Navbar from "../../components/Navbar/Navbar";
import { auth, db } from "../../firebase/firebaseConfig";
import "./CreateQueue.css";
import { serverTimestamp } from "firebase/firestore";
import FormComponent from "../../components/FormComponent/FormComponent";
import { useNavigate, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { getLoggedIn, getLoggedInId } from "../../api/LoggedInAPI";
import { QueueData, ReviewData } from "../../types/DatabaseTypes";
import { addQueue } from "../../api/QueuesAPI";
import { addQueueId } from "../../api/UserAPI";

const CreateQueue = () => {
  const navigate = useNavigate();
  async function postQueue(formData: Record<string, string>) {
    if (!getLoggedIn()) throw new Error("Login required");

    const queue: QueueData = {
      id: "",
      title: formData["title"],
      activityIds: [],
      dateCreated: Timestamp.now(),
    };
    addQueue(queue).then((queueId) => {
      addQueueId(getLoggedInId(), queueId);
      navigate("../queue/" + queueId);
    });
  }

  const fields = [
    {
      category: "input",
      name: "title",
      label: "title",
      type: "text",
      required: true,
    },
  ];
  return (
    <>
      <Navbar />
      <div className="content-container">
        <h2 className="header">Create Queue:</h2>
        <FormComponent fields={fields} onSubmit={postQueue} />
      </div>
    </>
  );
};

export default CreateQueue;
