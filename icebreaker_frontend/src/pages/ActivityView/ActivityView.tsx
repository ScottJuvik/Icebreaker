import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Activities from "../../components/Activities";
import ExpandedActivity from "../../components/ExpandedActivity/ExpandedActivity";
import Navbar from "../../components/Navbar/Navbar";
import ReviewCard from "../../components/Review/ReviewCard";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { Activity, Review } from "../../types/Types";
import "./ActivityView.css";
import FabButton from "../../components/FabButton/FabButton";
import { getReviews } from "../../api/ReviewAPI";
import { getActivity } from "../../api/ActivitiesAPI";

const ActivityView = () => {
  const { activityId } = useParams();
  const [activity, setActivity] = useState<Activity>(); // Use DocumentData type
  const [reviews, setReviews] = useState<Review[]>([]);
  const navigate = useNavigate();

  const getActivity = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "activities"));
      querySnapshot.forEach((doc) => {
        if (doc.id === activityId) {
          setActivity(doc.data() as Activity);
        }
      });
    } catch (error) {
      console.error("Error fetching activity:", error);
    }
  };

  const getReviews = async (activityId: string) => {
    try {
      const reviewList: Review[] = [];
      const querySnapshot = await getDocs(collection(db, "reviews"));
      querySnapshot.forEach((doc) => {
        const data: Review = {
          ...(doc.data() as Review),
          id: doc.id,
        };
        if (data.activityId === activityId) {
          reviewList.push(data);
        }
        setReviews(reviewList);
        console.log(reviewList);
      });
    } catch (error) {
      console.error("Error fetching reviews", error);
    }
  };
  useEffect(() => {
    if (!activityId) return;
    getActivity(activityId).then((activity) => {
      setActivity(activity);
    });
    getReviews(activityId).then((reviews) => {
      setReviews(reviews);
    });
  }, [activityId]);

  const handleReviewButton = () => {
    navigate("/create_review/" + activityId);
  };

  return (
    <>
      <Navbar />
      <div className="content_container">
        {activity ? <ExpandedActivity key={activity.id} {...activity} /> : null}
        <div className="review-section">
          {reviews.map((review: Review) => (
            <ReviewCard key={review.title} {...review} />
          ))}
        </div>
      </div>
      <FabButton handleClick={handleReviewButton} icon="review" />
    </>
  );
};

export default ActivityView;
