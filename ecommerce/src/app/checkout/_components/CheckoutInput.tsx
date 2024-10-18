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
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
};

const CheckoutInput = ({ type, placeholder, register, error }: Props) => {
  return (
    <>
      <div className="w-full">
        <input
          type={type}
          placeholder={placeholder}
          className="w-full p-2 border border-gray-300 rounded-md"
          {...register}
        />

        {error && (
          <p className="text-red-500 text-left  mt-1">{`${error.message}`}</p>
        )}
      </div>
    </>
  );
};

export default CheckoutInput;
