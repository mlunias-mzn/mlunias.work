import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router';

import PageHome from './Home/Page';
import PageSearch from './Search/Page';
import PageNotifications from './Notifications/Page';
import PageProfile from './Profile/Page';
import PageContent from './Content/Page';
import PageAuth from './Auth/Page';
import Page404 from './404/Page';
import PageOption from './Option/Page';

export default function () {
    return (
        <Router>
            <Routes>
                <Route path="/">
                    <Route index element={<PageHome />} />
                    <Route path="search" element={<PageSearch />} />
                    <Route path="notifications" element={<PageNotifications />} />
                    <Route path="profile" element={<PageProfile />} />

                    {/* 認証 (auth) */}
                    <Route path="auth" element={<PageAuth />} />
                    <Route path="login" element={<Navigate replace to="/auth?action=login" />} />
                    <Route path="signup" element={<Navigate replace to="/auth?action=signup" />} />
                    <Route path="logout" element={<Navigate replace to="/auth?action=logout" />} />

                    { /* 設定 (option) */}
                    <Route path="option">
                        <Route index element={<PageOption />} />
                        <Route path="profile" element={<PageOption target="profile" />} />
                        <Route path="privacy" element={<PageOption target='privacy' />} />
                        <Route path="*" element={<Navigate replace to="/option" />} />
                    </Route>
                </Route>
                <Route path="*" element={<Page404 />} />
            </Routes>
        </Router>
    )
}