import type React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
}

export const Input = ({ label, error, className = '', ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-xs w-full">
      {label && <label className="text-sm text-text-secondary ml-xs">{label}</label>}

      <input
        className={`
        bg-input text-text-primary p-md rounded-box-xs border outline-hidden transition-all duration-200 placeholder:text-text-secondary/50
        /*Если нет ошибка - обычная рамка, при фокусе -синяя*/
        ${error ? 'border-danger focus:border-danger' : 'border-border-color focus:border-primary-hover'}
        /*Добавим легкое свечение при фокусе*/
        focus:right-2 focus:ring-primary/20
        ${className}        
        `}
        {...props}
      />
    </div>
  );
};
