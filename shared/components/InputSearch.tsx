import React, { ChangeEvent, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { Input, InputProps } from "antd";
import { cn } from "../lib/utils";
import { CiSearch } from "react-icons/ci";

type DebounceInputProps = InputProps & {
  wait?: number;
  classInput?: string;
};

const InputSearchV2 = React.forwardRef<HTMLInputElement, DebounceInputProps>(
  (props, ref) => {
    const { wait = 500, className, onChange, classInput, ...rest } = props;
    const [focused, setFocused] = useState(false);

    const debouncedOnChange = useDebounce(
      (event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event);
      },
      wait
    );

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      debouncedOnChange(e);
    };

    return (
      <div className={cn("relative flex items-center", className)}>
        <Input
          {...rest}
          placeholder={rest.placeholder || "Tìm kiếm..."}
          onChange={handleInputChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "h-9 w-full rounded-full! border border-gray-300 bg-white",
            "pl-9 pr-3 text-sm",
            "placeholder:text-gray-400",
            "hover:border-blue-400",
            "focus:border-blue-500 focus:shadow-[0_0_0_2px_rgba(59,130,246,0.15)]",
            "transition-all",
            classInput
          )}
        />
      </div>
    );
  }
);

InputSearchV2.displayName = "InputSearchV2";
export default InputSearchV2;
