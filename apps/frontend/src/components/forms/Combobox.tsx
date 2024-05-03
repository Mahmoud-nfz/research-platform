import { Fragment, InputHTMLAttributes, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { FieldValues, Path, UseFormSetValue } from 'react-hook-form';
import clsxm from '@/utils/clsxm';
import { CheckIcon, ChevronUpDownIcon } from '@/assets';

interface ComboboxProps<D extends FieldValues>
	extends InputHTMLAttributes<HTMLInputElement> {
	error?: string;
	options: {
		value: string | number;
		label: string;
		id: number | string;
	}[];
	setValue: UseFormSetValue<D>;
	name: Path<D>;
	label: string;
	nullable?: false;
}

export default function ComboBoxWrapper<D extends FieldValues>({
	name,
	value,
	setValue,
	onBlur,
	label,
	options,
	error,
	nullable,
}: ComboboxProps<D>) {
	const [query, setQuery] = useState('');

	const filteredOptions =
		query === ''
			? options
			: options.filter((option) => {
					return option.label.toLowerCase().includes(query.toLowerCase());
				});

	const getNameFromValue = (value: string | number) => {
		const option = options.find((option) => option.value === value);
		return option ? option.label : '';
	};

	return (
		<div>
			<Combobox
				value={value}
				// @ts-ignore
				onChange={(value) => setValue(name, value)}
				nullable={nullable}
			>
				<Combobox.Label className="block text-sm font-medium leading-6 text-gray-900 mt-6">
					{label}
				</Combobox.Label>
				<div className="relative mt-1">
					<div className="relative w-full cursor-default overflow-hidden rounded-lg text-left shadow-md sm:text-sm">
						<Combobox.Button className="w-full inset-y-0 right-0 flex items-center p-2 bg-primary-200 placeholder-gray-500 border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300">
							<Combobox.Input
								className="bg-primary-200 placeholder-gray-500 w-full rounded-md outline-none transition-colors duration-300"
								onChange={(event) => setQuery(event.target.value)}
								displayValue={(optionValue: string | number) =>
									getNameFromValue(optionValue)
								}
								placeholder="Start typing to search..."
								onBlur={onBlur}
							/>
							<ChevronUpDownIcon
								className="h-5 w-5 text-gray-400"
								aria-hidden="true"
							/>
						</Combobox.Button>
					</div>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
						afterLeave={() => setQuery('')}
					>
						<Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{filteredOptions.length === 0 && query !== '' ? (
								<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
									Rien de trouvé.
								</div>
							) : (
								filteredOptions.map((option) => (
									<Combobox.Option
										key={option.id}
										className={({ active }) =>
											clsxm(
												'relative cursor-default py-2 pl-10 pr-4',
												active ? 'bg-primary-600 text-white' : 'text-gray-900'
											)
										}
										value={option.value}
									>
										{({ selected, active }) => (
											<>
												<span
													className={clsxm(
														'block truncate',
														selected ? 'font-medium' : 'font-normal'
													)}
												>
													{option.label}
												</span>
												{selected ? (
													<span
														className={clsxm(
															'absolute inset-y-0 left-0 flex items-center pl-3',
															active ? 'text-white' : 'text-primary-600'
														)}
													>
														<CheckIcon
															className="h-5 w-5 fill-white"
															aria-hidden="true"
														/>
													</span>
												) : null}
											</>
										)}
									</Combobox.Option>
								))
							)}
						</Combobox.Options>
					</Transition>
				</div>
			</Combobox>
			<span className="ml-2.5 block text-sm font-medium text-red-700">
				{error}
			</span>
		</div>
	);
}
