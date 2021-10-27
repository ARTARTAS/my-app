import { type } from "os";
import React from "react";
import { WrappedFieldProps } from "redux-form";
import s from "./FormControl.module.css";

export const Textarea: React.FC<WrappedFieldProps> = ({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={s.formControl + " " + (hasError ? s.error : "")}>
      <textarea {...input} {...props} />
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};

export const Input: React.FC<WrappedFieldProps> = ({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={s.formControl + " " + (hasError ? s.error : "")}>
      <input {...input} {...props} />
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};
