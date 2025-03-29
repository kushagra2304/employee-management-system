import { Routes, Route } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import UserList from "./pages/UserList";
import EditUser from "./pages/EditUser"; // Make sure this file exists
import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthForm />} />
      <Route path="/users" element={<UserList />} />
      <Route path="/edit/:id" element={<EditUser />} />
    </Routes>
  );
};

export default App;
