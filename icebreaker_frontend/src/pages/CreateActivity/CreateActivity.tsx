import { addDoc, collection, connectFirestoreEmulator, doc, Firestore, setDoc } from "firebase/firestore";
import Navbar from "../../components/Navbar/Navbar";
import { auth, db } from "../../firebase/firebaseConfig";
import "./CreateActivity.css";
import { serverTimestamp } from "firebase/firestore";
import { useState } from "react";
const CreateActivityPage = () => {
  const [formData, setFormData] = useState<Record<string, string>>({
    title: '',
    description: '',
    category: '',
  }
  )
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      postActivity(formData);
    } catch (error) {
      console.error(error);
    }
    setFormData(
      {
        title: '',
        description: '',
        category: '',
      }
    )
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }
    ))
  }
  async function postActivity(formData: Record<string, string>) {
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
  return (<>
    <Navbar />
    <div className="content-container">
      <form onSubmit={handleSubmit}>
        <div className="form-container"> <h2 className="header">Create activity:</h2>
          <div className="input-group">
            <label htmlFor="title">Activity name:</label>
            <input
              onChange={handleChange}
              value={formData.title}
              id="title"
              className="input"
              name="title"
              title="title">
            </input>
          </div>

          <div className="input-group">
            <label htmlFor="description"></label>
            <textarea
              onChange={handleChange}
              value={formData.description}
              id="description"
              className="large-input"
              name="description"
              title="description: "
              placeholder="Describe your activity...">
            </textarea>
          </div>
          <div className="input-group">
            <label htmlFor="category">Category:</label>
            <input
              onChange={handleChange}
              value={formData.category}
              id="category"
              className="input"
              name="category"
              title="category">
            </input>

          </div>
          <button type="submit" className="btn">Submit</button>
        </div>
      </form>
    </div>
  </>)
}





export default CreateActivityPage;
