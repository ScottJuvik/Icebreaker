import { addDoc, collection, doc, Firestore, setDoc } from "firebase/firestore";
import Navbar from "../../components/Navbar/Navbar";
import { auth, db } from "../../firebase/firebaseConfig";
import "./CreateActivity.css";
import { serverTimestamp } from "firebase/firestore";
import FormComponent from "../../components/FormComponent/FormComponent";

const CreateActivity = () => {

  async function postActivity(formData: Record<string, string>) {
    console.log(formData["name"]);
    if (!auth.currentUser) {
      throw new Error("Login required");
    }
    const activitiesRef = collection(db, "activities")
    const activity = await addDoc(activitiesRef, {
      title: formData['title'],
      description: formData['description'],
      category: formData['category'],
      creator: { id: auth.currentUser?.uid, name: auth.currentUser?.displayName },
      dateCreated: serverTimestamp(),
      averageRating: 0,

    }
    )
    console.log("activity written with id: ", activity.id)
  }

  const fields = [
    { category: "input", name: "title", label: "title", type: "text", required: true },
    { category: "textarea", name: "description", label: "description", type: "text", required: true },
    { category: "input", name: "category", label: "category", type: "text", required: true },
  ]
  return (<>
    <Navbar />
    <div className="content-container">
      <h2 className="header">Create Activity:</h2>
      <FormComponent fields={fields} onSubmit={postActivity} />
    </div>
  </>)
}





export default CreateActivity;
