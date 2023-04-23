import React, { useState, useEffect, Fragment } from 'react';
import { NotificationContext } from './contexts';
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { Transition } from '@headlessui/react'
import { v4 as uuidv4 } from 'uuid';

export const NotificationProvider = (props) => {
  const [messages, setMessages] = useState([]);

  const showNotification = (title, message, type) => {
    setMessages([{ uuid: uuidv4(), type: type, title: title, message: message }, ...messages]);
  };

  // should only be used from with this component since it depends on message uuid which is internal to this component
  const hideNotification = (uuid) => {
    // discard message with the given uuid
    setMessages((pre_messages) => pre_messages.filter((m) => m.uuid !== uuid));
  };
   
  const value = { messages, showNotification, hideNotification };

  return (
    <NotificationContext.Provider value={value}>
      {props.children}
    </NotificationContext.Provider>
  );
}

const Notification = (props) => {
  const { message, type = 'info', hideNotification } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      hideNotification(message.uuid)
    }, 2000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="w-full flex flex-col items-center pb-4 space-y-4 sm:items-end">
      {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
      <Transition
        show={true}
        as={Fragment}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {message.type === 'error' ?
                  <XCircleIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
                  :
                  <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                }
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-900">{message.title}</p>
                <p className="mt-1 text-sm text-gray-500">{message.message}</p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => {
                    hideNotification(message.uuid)
                  }}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
}

const Notifications = (props) => {

  const { messages } = props;

  return (
        <>
          {/* Global notification live region, render this permanently at the end of the document */}
          <div
            aria-live="assertive"
            className="fixed inset-0 flex flex-col items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
          >
           { messages.map((m) => <Notification message={m} {...props} /> )}
          </div>
        </>
  );
}

export const NotificationConsumer = () => {
  return (
    <NotificationContext.Consumer>
      { (value) => <Notifications {...value} /> }
    </NotificationContext.Consumer>
  );
}
