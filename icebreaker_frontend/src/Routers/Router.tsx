import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import CreateActivity from "../pages/CreateActivity/CreateActivity";
import CreateReview from "../pages/CreateReview/CreateReview";
import ActivityView from "../pages/ActivityView/ActivityView";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/:activityId" element={<ActivityView />} />
        <Route path="/create_activity" element={<CreateActivity />} />
        <Route path="/create_review/:activityId" element={<CreateReview />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
