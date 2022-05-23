import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


import { authActions } from "./store/auth";
import './Landing.css';
import "./App.css";
import HeaderExample from "./components/Header";
import NotesListPage from "./pages/NotesListPage";
import NotePage from "./pages/NotePage";
import LoginPage from "./pages/User/LoginPage";
import LogoutPage from "./pages/User/LogoutPage";
import SignupPage from "./pages/User/SignupPage";
import MainPage from "./pages/Main/MainPage";
import Header from "./components/Layout/Header";
import Landing from "./pages/Landing";
import Mypage from "./pages/Mypage";
import Navbar from "./components/Navbar";

function App() {
  const isExample = false;
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const user = JSON.parse(window.localStorage.getItem("loginedUser"));

  useEffect(() => {
    // 로그인 유무
    if (user !== null) {
      dispatch(authActions.login(user));
    }
  });

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
          {/*<Header />*/}
          <Navbar />
          <main>
            <Routes>
              <Route path="/logout" element={<LogoutPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/" element={<Landing/>}/>
              <Route path="/mypage" element={<Mypage/>}/>
              {isAuth ? (
                <>
                  <Route path="/login" element={<Navigate replace to="/main" />} />
                  <Route path="/main" element={<MainPage />} />
                </>
              ) : (
                <>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/main" element={<Navigate replace to="/login" />} />
                </>
              )}
            </Routes>
          </main>
        </>
      )}
    </Router>
  );
}

export default App;
