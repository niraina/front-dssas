/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Input } from 'antd';

interface FieldProps {
  label?: string;
  name: string;
  status?: "" | "warning" | "error" | undefined;
  placeholder?: string,
  type: "number" | "text" | "file" | "password" | "email",
  prefix?: any,
  suffix?: any,
  value: string | number
  onChange: (a: any) => void,
  min?: number;
  max?: number;
}

const Field: React.FC<FieldProps> = ({
  placeholder="",
  type="text",
  status="",
  prefix="",
  suffix="",
  value,
  onChange,
  name,
  label="",
  min,
  max
}) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Input 
        prefix={prefix}
        suffix={suffix}
        placeholder={placeholder}
        status={status}
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        min={min}
        max={max}
      />
    </>
  )
}

export default Field