import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import FeedbackForm from './pages/FeedbackForm';
import PrivateRoute from './routes/PrivateRoute';
import FeedbackDetails from './pages/FeedbackDetails';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota pública */}
        <Route path="/" element={<FeedbackForm />} />

        {/* Rota de login */}
        <Route path="/login" element={<Login />} />

        {/* Rota protegida para Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Rota protegida para ver detalhes do Feedback */}
        <Route
          path="/feedback/:id"
          element={
            <PrivateRoute>
              <FeedbackDetails />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
