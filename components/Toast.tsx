
import React from 'react';

interface ToastProps {
    message: string | null;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
    if (!message) return null;

    return (
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 px-6 py-3 bg-green-500 text-white rounded-full shadow-lg animate-fade-in-out z-50">
            {message}
            <style>
                {`
                    @keyframes fade-in-out {
                        0% { opacity: 0; transform: translate(-50%, 20px); }
                        10% { opacity: 1; transform: translate(-50%, 0); }
                        90% { opacity: 1; transform: translate(-50%, 0); }
                        100% { opacity: 0; transform: translate(-50%, 20px); }
                    }
                    .animate-fade-in-out {
                        animation: fade-in-out 2s ease-in-out;
                    }
                `}
            </style>
        </div>
    );
};

export default Toast;
