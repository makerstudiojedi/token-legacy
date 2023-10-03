import { ChangeEvent, ReactNode, useCallback } from "react";
import { CommonInputProps } from "~~/components/scaffold-eth";

type InputBaseProps<T> = CommonInputProps<T> & {
  error?: boolean;
  disabled?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
};

export const InputBase = <T extends { toString: () => string } | undefined = string>({
  name,
  value,
  onChange,
  placeholder,
  disabled,
  prefix,
  suffix,
}: InputBaseProps<T>) => {
  // let modifier = "";
  // if (error) {
  //   modifier = "border-error";
  // } else if (disabled) {
  //   modifier = "border-disabled bg-base-300";
  // }

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value as unknown as T);
    },
    [onChange],
  );

  return (
    <>
      {prefix}
      <input
        className="w-full bg-transparent text-[#3F5876] outline-none"
        placeholder={placeholder}
        name={name}
        value={value?.toString()}
        onChange={handleChange}
        disabled={disabled}
        autoComplete="off"
        autoFocus
      />
      {suffix}
    </>
  );
};
