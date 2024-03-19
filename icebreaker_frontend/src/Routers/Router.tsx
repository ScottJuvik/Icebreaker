import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import MyPage from "../pages/MyPage";
import QueuePage from "../pages/QueuePage";
import NotFoundPage from "../pages/NotFoundPage";
import CreateActivity from "../pages/CreateActivity/CreateActivity";
import CreateReview from "../pages/CreateReview/CreateReview";
import ActivityView from "../pages/ActivityView/ActivityView";
import CreateQueue from "../pages/CreateQueue/CreateQueue";
import Admin from "../pages/Admin";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/:activityId" element={<ActivityView />} />
        <Route path="/create_activity" element={<CreateActivity />} />
        <Route path="/create_review/:activityId" element={<CreateReview />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my_page" element={<MyPage />} />
        <Route path="/create_queue" element={<CreateQueue />} />
        <Route path="/queue/:queueId" element={<QueuePage />} />
        <Route path="/queue/" element={<QueuePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
