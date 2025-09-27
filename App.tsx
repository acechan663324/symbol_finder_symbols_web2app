
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import SymbolBrowser from './components/SymbolBrowser';
import Toast from './components/Toast';

const App: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = useCallback((message: string) => {
        setToastMessage(message);
        setTimeout(() => {
            setToastMessage(null);
        }, 2000);
    }, []);

    const handleCopy = useCallback((text: string) => {
        navigator.clipboard.writeText(text);
        showToast('Copied to clipboard!');
    }, [showToast]);

    return (
        <div className="min-h-screen bg-gray-900 font-sans text-gray-200">
            <Header
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            {/* Adjusted top padding for smaller header */}
            <main className="p-4 pt-24">
                <SymbolBrowser onCopy={handleCopy} searchQuery={searchQuery} />
            </main>
            <Toast message={toastMessage} />
        </div>
    );
};

export default App;
