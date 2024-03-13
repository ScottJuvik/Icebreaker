import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import QueuesPage from "../pages/QueuesPage";
import QueuePage from "../pages/QueuePage";
import NotFoundPage from "../pages/NotFoundPage";
import CreateActivity from "../pages/CreateActivity/CreateActivity";
import CreateReview from "../pages/CreateReview/CreateReview";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/create_activity" element={<CreateActivity />} />
        <Route path="/create_review/:activityId" element={<CreateReview />} />
        <Route path="/login" element={<Login />} />
        <Route path="/queues" element={<QueuesPage />} />
        <Route path="/queue/:queueId" element={<QueuePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
