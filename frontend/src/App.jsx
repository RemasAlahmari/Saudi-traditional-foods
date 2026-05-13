import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './state/AuthContext';
import ProtectedRoute from './state/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home       from './pages/Home';
import MealDetail from './pages/MealDetail';
import Login      from './pages/Login';
import Register   from './pages/Register';
import Favorites  from './pages/Favorites';
import Profile    from './pages/Profile';
import NotFound   from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Routes>
            <Route path="/"         element={<Home />} />
            <Route path="/meal/:id" element={<MealDetail />} />
            <Route path="/login"    element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
            <Route path="/profile"   element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="*"          element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
