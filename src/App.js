import React from 'react';

import './App.css';
import Sidebar from './Sidebar'
import Heading from './Heading'
import Bookings from './Bookings'

import { NotificationProvider, NotificationConsumer } from './Notification';
import { AppContext } from './contexts';

const App = () => {

  const app_context_value = { appConfig: {}, };

  return (
    <AppContext.Provider value={app_context_value}>
      <NotificationProvider>

        <div>
          <Sidebar />
          <div className="xl:pl-72">
            <main>
              <Heading />
              <Bookings />
            </main>
          </div>
        </div>

        <NotificationConsumer />

      </NotificationProvider>
    </AppContext.Provider>
  );
}

export default App;
