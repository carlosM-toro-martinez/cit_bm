import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import ProtectedRoutes from './components/ProtectedRoutes';
import RegisterComponent from './components/RegisterComponent';
import CategoriesComponent from './components/CategoriesComponent';
import CoursesComponent from './components/CoursesComponent';
import MesaggesComponent from './components/MesaggesComponent';
import ProjectComponent from './components/ProjectComponent';
import TeamComponent from './components/TeamComponent';
import AdminComponent from './components/AdminComponent';
import ContactComponent from './components/ContactComponent';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<LoginComponent />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path="/register" element={<RegisterComponent />} />
                    <Route path="/categorie" element={<CategoriesComponent />} />
                    <Route path="/contact" element={<ContactComponent />} />
                    <Route path="/courses" element={<CoursesComponent />} />
                    <Route path="/messages" element={<MesaggesComponent />} />
                    <Route path="/projects" element={<ProjectComponent />} />
                    <Route path="/team" element={<TeamComponent />} />
                    <Route path="/admins" element={<AdminComponent />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App;

if (document.getElementById('root')) {
    const Index = ReactDOM.createRoot(document.getElementById("root"));

    Index.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    )
}