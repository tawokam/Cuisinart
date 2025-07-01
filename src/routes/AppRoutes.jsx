import { Routes, Route } from 'react-router-dom';
import RegisterForm from '../features/Auth/Components/RegisterForm';
import LoginForm from '../features/Auth/Components/LoginForm';
//import Home from '../pages/Home';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
}
// <Route path="/" element={<Home />} />