import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import './App.css';
import './Landing.css';
// import Header from './components/LandingHeader'
import NotesListPage from './pages/NotesListPage'
import NotePage from './pages/NotePage'
import Landing from "./pages/Landing";
import Mypage from "./pages/Mypage";

function App() {
    return (
        <Router>
            <div className="container dark">
                <div className="app">
                    {/*<Header/>*/}
                    <Routes>
                        <Route path="/" element={<NotesListPage/>}/>
                        <Route path="/note/:id" element={<NotePage/>}/>
                        <Route path="/landing" element={<Landing/>}/>
                        <Route path="/:id" element={<Mypage/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;