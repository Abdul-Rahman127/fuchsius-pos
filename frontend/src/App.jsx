import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import RoleSelection from './RoleSelection';
import PinLogin from './PinLogin';
import ForgotPassword from './ForgotPassword';
import UserManagement from './UserManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/roles" element={<RoleSelection />} />
        <Route path="/pin-login" element={<PinLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/users" element={<UserManagement />} />
      </Routes>
    </Router>
  );
}

export default App;