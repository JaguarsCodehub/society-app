import React, { createContext, useState, useContext, ReactNode } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface ToastMessage {
    type: ToastType;
    message: string;
}

interface ToastContextType {
    showToast: (type: ToastType, message: string) => void;
    hideToast: () => void;
    toast: ToastMessage | null;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toast, setToast] = useState<ToastMessage | null>(null);

    const showToast = (type: ToastType, message: string) => {
        setToast({ type, message });
        setTimeout(() => {
            setToast(null);
        }, 3000); // Hide toast after 3 seconds
    };

    const hideToast = () => {
        setToast(null);
    };

    return (
        <ToastContext.Provider value={{ showToast, hideToast, toast }}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};