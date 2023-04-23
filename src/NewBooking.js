import { Fragment, useEffect, useState } from 'react';

import { Transition } from '@headlessui/react'
import { useListAvailableSlots, useCreateSlot } from './hooks/slots';
import LoadingIndicator, { BlockLoadingIndicator } from "./LoadingIndicator";
import DurationSelect from "./DurationSelect";
import ErrorMessage from "./ErrorMessage";
import DatePicker from 'react-datepicker';
import { format } from 'date-fns'
import { UseNotificationContext } from './contexts';

import "react-datepicker/dist/react-datepicker.css";

const SlotConfirmation = (props) => {

    const { showNotification } = UseNotificationContext();

    const { selectedSlot, setSelectedSlot, onBooked } = props;
    const { mutate: createSlot, status: create_status, error: create_error, isLoading: createLoading } = useCreateSlot();


    useEffect(() => {

        if (create_status === 'success') {
            showNotification('Successfully booked!', 'Your slot has been successfully created');
            onBooked();
        } else if (create_error) {
            showNotification('Error', create_error.message, 'error');
        }

    }, [create_status, create_error]);

    return (
        <>
            <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                {createLoading && <div className="h-8 bg-gray-900"> <BlockLoadingIndicator /> </div>}
                {!createLoading &&
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
                        <div className="pointer-events-auto w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="p-4">
                                <div className="flex items-start">
                                    <div className="ml-3 w-0 flex-1 pt-0.5">
                                        <p className="text-sm font-medium text-gray-900">Confirm booking</p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Are you sure you want to book a slot from {(format(new Date(selectedSlot.start), "hh:mm:ss a"))} to {(format(new Date(selectedSlot.end), "hh:mm:ss a"))} on {(format(new Date(selectedSlot.start), "PP"))} ?
                                        </p>
                                        <div className="mt-3 flex space-x-7">
                                            <button
                                                type="button"
                                                onClick={() => createSlot({ slot: selectedSlot })}
                                                className="rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                Yes
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setSelectedSlot(null)}
                                                className="rounded-md bg-white text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                }
            </div>
        </>
    )
}


const AvailableSlots = (props) => {

    const { date, duration, onBooked } = props;
    const { data: slots = [], isFetching, error } = useListAvailableSlots({ date: date, duration: duration });

    const [selectedSlot, setSelectedSlot] = useState();

    useEffect(() => {
        // hide slot booking confirmatin dialuge when the user selects a new date or duration
        if (date && duration) setSelectedSlot(null);
    }, [date, duration]);

    return (
        <>
            {error && <ErrorMessage error={error} />}
            {isFetching && !error && <LoadingIndicator />}
            {!error &&
                <div className="">
                    {selectedSlot && <SlotConfirmation selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} onBooked={onBooked} />}
                    {!selectedSlot &&
                        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {slots.map((slot) => (
                                <li key={slot.start} className="col-span-1 divide-y divide-gray-200 rounded-lg">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedSlot(slot)}
                                        className="rounded bg-white/10 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-white/20"
                                    >
                                        {(format(new Date(slot.start), "hh:mm:ss a"))} - {(format(new Date(slot.end), "hh:mm:ss a"))}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    }
                </div>
            }
        </>

    )
}

const NewBooking = (props) => {

    const { onBooked } = props;
    const [date, setDate] = useState();
    const [duration, setDuration] = useState();

    return (
        <div className="p-8 flex">
            <div className="flex flex-col">
                <DatePicker
                    selected={new Date()}
                    minDate={new Date()}
                    onChange={setDate}
                    inline
                />
                <DurationSelect onChange={setDuration} />
            </div>
            <div className='flex-grow px-4'>
                {!date && <p className="text-sm font-semibold leading-6 text-white">Please select a date</p>}
                {!duration && <p className="text-sm font-semibold leading-6 text-white">Please select a valid duration</p>}
                {date && duration && <AvailableSlots date={date} duration={duration} onBooked={onBooked} />}
            </div>
        </div>
    )
}


export default NewBooking;
