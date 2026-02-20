import type React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
}

export const Input = ({
  label,
  error,
  className = '',
  ...props
}: InputProps) => {
  return (
    <div className="gap-xs flex w-full flex-col">
      {label && (
        <label className="text-text-secondary ml-xs text-sm">
          {label}
        </label>
      )}

      <input
        className={`bg-input text-text-primary p-md rounded-box-xs placeholder:text-text-secondary/50 /*Если нет ошибка - обычная рамка, при фокусе -синяя*/ border outline-hidden transition-all duration-200 ${error ? 'border-danger focus:border-danger' : 'border-border-color focus:border-primary-hover'} /*Добавим легкое свечение при фокусе*/ focus:ring-primary/20 focus:right-2 ${className} `}
        {...props}
      />
    </div>
  );
};
