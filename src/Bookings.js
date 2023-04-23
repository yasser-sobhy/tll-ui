import { useState } from 'react';

import { useListSlots } from './hooks/slots';
import LoadingIndicator from "./LoadingIndicator";
import NewBooking from "./NewBooking";
import ErrorMessage from "./ErrorMessage";
import { formatRelative, formatDistance } from 'date-fns'

const statuses = { New: 'text-green-400 bg-green-400/10', Completed: 'text-blue-400 bg-blue-400/10', Cancelled: 'text-rose-400 bg-rose-400/10' }

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Bookings() {

    const [creating, setCreating] = useState(false);
    const { data: slots = [], isFetching, error } = useListSlots();

    return (
        <div className="border-t border-white/10 pt-11">
            <header className="flex px-4">
                <h2 className="flex-grow text-base font-semibold leading-7 text-white">Your bookings</h2>
                <a href="#" onClick={() => setCreating(!creating)} className="text-sm font-semibold leading-6 text-indigo-400">
                    {!creating && `New booking`}
                    {creating && `Cancel`}
                </a>
            </header>
            {error && <ErrorMessage error={error} />}
            {isFetching && !error && <LoadingIndicator />}
            {creating && <NewBooking onBooked={() => setCreating(false)} />}
            {!error && !creating &&
                <table className="mt-6 w-full whitespace-nowrap text-left">
                    <colgroup>
                        <col className="w-full sm:w-4/12" />
                        <col className="lg:w-4/12" />
                        <col className="lg:w-2/12" />
                        <col className="lg:w-1/12" />
                        <col className="lg:w-1/12" />
                    </colgroup>
                    <thead className="border-b border-white/10 text-sm leading-6 text-white">
                        <tr>
                            <th scope="col" className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
                                ID
                            </th>
                            <th scope="col" className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">
                                Date
                            </th>
                            <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20">
                                Status
                            </th>
                            <th
                                scope="col"
                                className="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"
                            >
                                Booked at
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {slots.map((slot) => (
                            <tr key={slot.id}>
                                <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                                    <div className="flex items-center gap-x-4">
                                        <div className="truncate text-sm font-medium leading-6 text-white">{slot.id}</div>
                                    </div>
                                </td>
                                <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                                    <div className="flex gap-x-3">
                                        <div className="font-mono text-sm leading-6 text-gray-400">{formatRelative(new Date(slot.start), new Date())}</div>
                                        <span className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20">
                                            {formatDistance(new Date(slot.start), new Date(slot.end))}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                                    <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                                        <time className="text-gray-400 sm:hidden" dateTime={slot.dateTime}>
                                            {slot.date}
                                        </time>
                                        <div className={classNames(statuses[slot.status], 'flex-none rounded-full p-1')}>
                                            <div className="h-1.5 w-1.5 rounded-full bg-current" />
                                        </div>
                                        <div className="hidden text-white sm:block">{slot.status}</div>
                                    </div>
                                </td>
                                <td className="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8">
                                    <time dateTime={slot.dateTime}>{formatRelative(new Date(slot.created_at), new Date())}</time>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
    )
}
