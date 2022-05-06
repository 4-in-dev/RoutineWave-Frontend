import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import './App.css';
import HeaderExample from './components/Header'
import NotesListPage from './pages/NotesListPage'
import NotePage from './pages/NotePage'
import LoginPage from "./pages/User/LoginPage";
import SignupPage from "./pages/User/SignupPage";
import Header from './components/Layout/Header'

function App() {
    const isExample = false
    return (
        <Router>
        { isExample ?
            <div className="container">
                <div className="app">
                    <HeaderExample/>
                    <Routes>
                        <Route path="/" element={<NotesListPage/>}/>
                        <Route path="/note/:id" element={<NotePage/>}/>
                    </Routes>
                </div>
            </div>
            :
            <>
                <Header />
                <main>
                    <Routes>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/signup" element={<SignupPage/>}/>
                    </Routes>
                </main>
            </>
        }
        </Router>
    );
}

export default App;