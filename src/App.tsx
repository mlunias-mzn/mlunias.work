import { BrowserRouter as Router, Route, Routes } from 'react-router';
import { CookiesProvider } from 'react-cookie';
import './App.css'

import PageHome from './components/pages/PageHome';
import PageSearch from './components/pages/PageSearch';
import PageNotifications from './components/pages/PageNotifications';
import PageProfile from './components/pages/PageProfile';
import PageContent from './components/pages/PageContent';
import Page404 from './components/pages/Page404';

function App() {
    return (
        <CookiesProvider defaultSetOptions={{ path: '/' }}>
            <Router>
                <Routes>
                    <Route path="/" element={<PageHome />} />
                    <Route path="/search" element={<PageSearch />} />
                    <Route path="/notifications" element={<PageNotifications />} />
                    <Route path="/profile" element={<PageProfile />} />
                    <Route path="/error" element={<Page404 />} />
                    <Route path="*" element={<PageContent />} />
                </Routes>
            </Router>
        </CookiesProvider>
    );
}

export default App
