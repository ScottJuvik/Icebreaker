import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Activities from "../../components/Activities/Activities";
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
import PopupMenu from "../../components/Menu/PopupMenu";

const ActivityView = () => {
  const { activityId } = useParams();
  const [activity, setActivity] = useState<Activity>(); // Use DocumentData type
  const [reviews, setReviews] = useState<Review[]>([]);
  const navigate = useNavigate();

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
