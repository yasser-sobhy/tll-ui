import { createContext, useContext } from 'react';

export const AppContext = createContext();
export const NotificationContext = createContext();

export const UseAppContext = () => useContext(AppContext);
export const UseNotificationContext = () => useContext(NotificationContext);
