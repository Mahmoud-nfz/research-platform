'use client';

import React, { Fragment, useCallback, useMemo, useState } from 'react';
import { CheckIcon, DownChevronIcon, SearchIcon } from '@/assets';
import { Listbox, Transition } from '@headlessui/react';
import clsxm from '@/utils/clsxm';
import { useForm } from 'react-hook-form';
import { usePathname, useRouter } from 'next/navigation';

const searchCategories = [
	{ value: 'all', label: 'Tous' },
	{ value: 'projects', label: 'Projets' },
	{ value: 'data', label: 'Data' },
	{ value: 'models', label: 'Models' },
];

export const SearchBar = () => {
	const router = useRouter();
	const path = usePathname();
	const defaultSelected = useMemo(() => {
		const index = searchCategories.findIndex((category) =>
			path.includes(category.value)
		);
		return searchCategories[index == -1 ? 0 : index];
	}, [path]);
	const [selected, setSelected] = useState(defaultSelected);
	const { register, handleSubmit } = useForm<{ search: string }>({
		mode: 'onTouched',
	});

	const handleSearch = (data: { search: string }) => {
		router.push(
			`/platform/${selected.value}/search-results?query=${data.search}`
		);
	};

	return (
		<form
			onSubmit={handleSubmit(handleSearch)}
			className="flex-grow mx-auto flex h-10"
		>
			<div>
				<Listbox value={selected} onChange={setSelected}>
					<div className="relative h-full">
						<Listbox.Button
							type="button"
							className="relative w-32 h-full text-gray-900 cursor-default rounded-l-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
						>
							<span className="block truncate">{selected.label}</span>
							<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
								<DownChevronIcon className="h-3 w-3" aria-hidden="true" />
							</span>
						</Listbox.Button>
						<Transition
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
								{searchCategories.map((category, idx) => (
									<Listbox.Option
										key={idx}
										className={({ active }) =>
											clsxm(
												'relative cursor-default select-none py-2 pl-10 pr-4',
												active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
											)
										}
										value={category}
									>
										{({ selected }) => (
											<>
												<span
													className={clsxm(
														'block truncate',
														selected ? 'font-medium' : 'font-normal'
													)}
												>
													{category.label}
												</span>
												{selected ? (
													<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
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
				</Listbox>
			</div>
			<div className="relative w-full flex">
				<input
					id="search"
					placeholder="Search Projects, Data, Templates..."
					{...register('search')}
					className={clsxm(
						'p-2 placeholder-gray-500 text-gray-900 text-sm h-full w-full border focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300 transition-colors duration-300'
					)}
					required
				/>
				<button
					type="submit"
					className="pl-2 h-full w-10 text-sm font-medium text-black bg-gray-200 rounded-r-md border focus:ring-4 focus:outline-none focus:ring-blue-300"
				>
					<SearchIcon className="h-5 w-5" />
					<span className="sr-only">Search</span>
				</button>
			</div>
		</form>
	);
};
