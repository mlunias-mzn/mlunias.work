import { CookiesProvider } from 'react-cookie';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css'
import Router from './components/pages/Router';

function App() {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <CookiesProvider defaultSetOptions={{ path: '/' }}>
                <Router />
            </CookiesProvider>
        </QueryClientProvider>
    );
}

export default App
