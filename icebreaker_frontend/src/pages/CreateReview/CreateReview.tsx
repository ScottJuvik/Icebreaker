import { addDoc, collection } from "firebase/firestore";
import Navbar from "../../components/Navbar/Navbar";
import { auth, db } from "../../firebase/firebaseConfig";
import "./CreateReview.css";
import { serverTimestamp } from "firebase/firestore";
import FormComponent from "../../components/FormComponent/FormComponent";
import { useParams } from "react-router-dom";

const CreateReview = () => {
  //TODO: Add support for numerical rating.
  const { activityId } = useParams();
  async function postReview(formData: Record<string, string>) {
    if (!auth.currentUser) {
      throw new Error("Login required");
    }
    const activitiesRef = collection(db, "activities")
    const review = await addDoc(activitiesRef, {
      title: formData['title'],
      description: formData['description'],
      creator: { id: auth.currentUser?.uid, name: auth.currentUser?.displayName },
      dateCreated: serverTimestamp(),
      activityID: activityId,
    }
    )
    console.log("Review written with id: ", review.id)
  }

  const fields = [
    { category: "input", name: "title", label: "title", type: "text", required: true },
    { category: "textarea", name: "description", label: "description", type: "text", required: true },
  ]
  return (<>
    <Navbar />
    <div className="content-container">
      <h2 className="header">Create Review:</h2>
      <FormComponent fields={fields} onSubmit={postReview} />
    </div>
  </>)
}

export default CreateReview;




