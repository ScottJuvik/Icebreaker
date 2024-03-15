import "./ReviewCard.css";
import { Review } from "../../types/types";
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { db } from "../../firebase/firebaseConfig";
import { FaTrashAlt } from "react-icons/fa";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

const ReviewCard = (params: Review) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate()

  const deleteReview = async () => {
    await deleteDoc(doc(db, "reviews", params.id));
    navigate(0);
  }

  const retrieveAdmin = async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId) {
      return;
    }
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setIsAdmin(docSnap.data().type == "admin");
    }
    else {
      console.log("No such document!")
    }
  }

  useEffect(() => {
    retrieveAdmin();
  }, [navigate])

  return (
    <>
      <div className="review-container">
        <h3 className="title">{params.title}</h3>
        <p className="author-text">Bruker: {params.creator.name}</p>
        <p className="text-body">{params.description}</p>
        <div>
          {isAdmin &&
            <FaTrashAlt className="trash-btn" onClick={() => deleteReview()} />
          }
          <FlagOutlinedIcon className="report-btn" />
        </div>
      </div>
    </>
  )
}

export default ReviewCard;
