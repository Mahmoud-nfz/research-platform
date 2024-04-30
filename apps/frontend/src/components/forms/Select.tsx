import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import {
  InputHTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useState,
} from "react";
import { FieldValues, Path } from "react-hook-form";
import { DeleteLeftIcon } from "@/assets";
import clsxm from "@/utils/clsxm";

interface SelectProps<D extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  getValues: UseFormGetValues<D>;
  setValue: UseFormSetValue<D>;
  watch: UseFormWatch<D>;
  name: Path<D>;
  label: string;
}

export default function Input<D extends FieldValues>({
  error,
  getValues,
  setValue,
  watch,
  name,
  label,
  ...props
}: SelectProps<D>) {
  const [element, setElement] = useState("");

  const insertElement = (value: string) => {
    // @ts-ignore
    setValue(name, [...(getValues(name) ?? []), value]);
  };

  const handleAddButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    insertElement(element);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      insertElement(event.currentTarget.value.toString());
    }
  };

  const handleDelete = (
    event: MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    event.preventDefault();
    // @ts-ignore
    setValue(name, (getValues(name) ?? []).toSpliced(index, 1));
  };

  return (
    <div>
      <label className="block" htmlFor="add-element">
        <span>{label}</span>{" "}
        {props.required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex items-center gap-2 justify-between">
        <input
          id={name}
          {...props}
          type="text"
          name="add-element"
          onKeyDown={handleKeyDown}
          onChange={(event) => setElement(event.currentTarget.value.toString())}
          className={clsxm(
            "mt-1 p-2 bg-primary-200 placeholder-gray-500 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300",
            props.className
          )}
        />
        <button
          onClick={handleAddButtonClick}
          className="bg-primary-700 select-none h-full text-white px-2.5 pt-1 pb-1.5 rounded-full"
        >
          +
        </button>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {watch(name).map((element: string, index: number) => (
          <div
            key={index}
            className="rounded-full flex gap-1 items-center w-fit bg-primary-700 text-white"
          >
            <span className="p-2 pr-0">{element}</span>
            <button
              onClick={(event) => handleDelete(event, index)}
              className="p-2 pl-0"
            >
              <DeleteLeftIcon
                height={16}
                width={16}
                className="stroke-primary-700 fill-white"
              />
            </button>
          </div>
        ))}
      </div>
      <span className="ml-2.5 block text-sm font-medium text-red-700">
        {error}
      </span>
    </div>
  );
}
