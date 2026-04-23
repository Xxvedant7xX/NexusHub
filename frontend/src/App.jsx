import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "./components/AppLayout.jsx";
import AddMemberPage from "./pages/AddMemberPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import MemberDetailsPage from "./pages/MemberDetailsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ViewMembersPage from "./pages/ViewMembersPage.jsx";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-member" element={<AddMemberPage />} />
        <Route path="/view-members" element={<ViewMembersPage />} />
        <Route path="/member/:id" element={<MemberDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
