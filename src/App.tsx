import { BrowserRouter as Router, Route, Routes } from 'react-router';
import { CookiesProvider } from 'react-cookie';
import './App.css'

import PageHome from './components/pages/Home/Page';
import PageSearch from './components/pages/Search/Page';
import PageNotifications from './components/pages/Notifications/Page';
import PageProfile from './components/pages/Profile/Page';
import PageContent from './components/pages/Content/Page';
import PageAuth from './components/pages/Auth/Page';
import Page404 from './components/pages/404/Page';

function App() {
    return (
        <CookiesProvider defaultSetOptions={{ path: '/' }}>
            <Router>
                <Routes>
                    <Route path="/" element={<PageHome />} />
                    <Route path="/search" element={<PageSearch />} />
                    <Route path="/notifications" element={<PageNotifications />} />
                    <Route path="/profile" element={<PageProfile />} />
                    <Route path="/auth" element={<PageAuth />} />
                    <Route path="/error" element={<Page404 />} />
                    <Route path="*" element={<PageContent />} />
                </Routes>
            </Router>
        </CookiesProvider>
    );
}

export default App
