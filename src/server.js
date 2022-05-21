import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./App.css";
import HeaderExample from "./components/Header";
import NotesListPage from "./pages/NotesListPage";
import NotePage from "./pages/NotePage";
import LoginPage from "./pages/User/LoginPage";
import LogoutPage from "./pages/User/LogoutPage";
import SignupPage from "./pages/User/SignupPage";
import MainPage from "./pages/Main/MainPage";
import Header from "./components/Layout/Header";

function App() {
  const isExample = false;
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Router>
      {isExample ? (
        <div className="container">
          <div className="app">
            <HeaderExample />
            <Routes>
              <Route path="/" element={<NotesListPage />} />
              <Route path="/note/:id" element={<NotePage />} />
            </Routes>
          </div>
        </div>
      ) : (
        <>
          <Header />
          <main>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/logout" element={<LogoutPage />} />
              <Route path="/signup" element={<SignupPage />} />
              {isAuth && <Route path="/main" element={<MainPage />} />}
              {!isAuth && <Route path="/main" element={<Navigate replace to='/login' />} />}
            </Routes>
          </main>
        </>
      )}
    </Router>
  );
}

export default App;
