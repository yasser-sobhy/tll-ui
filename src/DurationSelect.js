import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const durations = [
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 45, label: '45 minutes' },
    { value: 60, label: '60 minutes' },
    { value: 75, label: '75 minutes' },
    { value: 90, label: '90 minutes' },
    { value: 105, label: '105 minutes' },
    { value: 120, label: '120 minutes' },
    { value: 0, label: 'Custom value', custom_value: true },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function DurationSelect(props) {

    const { onChange } = props;
    const [selected, setSelected] = useState(durations[0])

    useEffect(() => {
        if (selected.value % 15 === 0) {
            onChange(selected.value);            
        } else {
            onChange(null);
        }
    }, [selected]);

    return (
        <>
            <Listbox value={selected} onChange={setSelected}>
                {({ open }) => (
                    <>
                        <Listbox.Label className="block text-sm font-medium leading-6 text-white">Duration</Listbox.Label>
                        <div className="relative mt-2">
                            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <span className="block truncate">{selected.label}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </Listbox.Button>

                            <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {durations.map((duration) => (
                                        <Listbox.Option
                                            key={duration.value}
                                            className={({ active }) =>
                                                classNames(
                                                    active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                    'relative cursor-default select-none py-2 pl-8 pr-4'
                                                )
                                            }
                                            value={duration}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                        {duration.label}
                                                    </span>

                                                    {selected ? (
                                                        <span
                                                            className={classNames(
                                                                active ? 'text-white' : 'text-indigo-600',
                                                                'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                                            )}
                                                        >
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </>
                )}
            </Listbox>
            {selected.custom_value &&
                <div className="mt-2">
                    <div className="">
                        <input
                            type="number"
                            id="custom-duration"
                            name="custom-duration"
                            onChange={(e) => setSelected({ ...selected, value: e.target.value })}
                            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
            }
        </>

    )
}