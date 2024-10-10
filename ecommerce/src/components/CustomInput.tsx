// import Eye from "@/app/svg/eye";
// import EyeOff from "@/app/svg/eye-off";

import React from "react";
import {
  FieldError,

  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from "react-hook-form";

type Props = {
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: FieldError | Merge <FieldError, FieldErrorsImpl<any>> | undefined;
};

const CustomInput = ({ type, placeholder, register, error }: Props) => {
  // const [showPassword, setShowPassword] = useState(false);
  return (
    <>
    
      <div>
        <input
          className="rounded-md pl-3 py-3 bg-white/80 w-full text-black outline-none focus:ring-2 focus:ring-white focus:bg-white"
          type={type}
          placeholder={placeholder}
          {...register}
        />
        {error && <p className="text-red-500 text-left mt-1 ">{`${error.message}`}</p>}
      </div>

      {/* <input
        className="rounded-md pl-3 py-3 bg-white/80 w-full text-black outline-none focus:ring-2 focus:ring-white focus:bg-white"
        type="email"
        placeholder="Email"
      />

      <div className="relative">
        <input
          className="rounded-md pl-3 py-3 bg-white/80 w-full text-black outline-none focus:ring-2 focus:ring-white focus:bg-white"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
        />
        <div
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
        >
          {showPassword ? (
            <EyeOff className="h-6 w-6" />
          ) : (
            <Eye className="h-6 w-6" />
          )}
        </div>
      </div>

      <div className="relative">
        <input
          className="rounded-md pl-3 py-3 bg-white/80 w-full text-black outline-none focus:ring-2 focus:ring-white focus:bg-white"
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
        />
        <div
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
        >
          {showPassword ? (
            <EyeOff className="h-6 w-6" />
          ) : (
            <Eye className="h-6 w-6" />
          )}
        </div>
      </div> */}
    </>
  );
};

export default CustomInput;
