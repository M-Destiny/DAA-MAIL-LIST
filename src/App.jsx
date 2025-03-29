import { Routes, Route } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import TermsAndConditions from "./components/TermsAndConditions";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SignupForm />} />
      <Route path="/terms" element={<TermsAndConditions />} />
    </Routes>
  );
}
