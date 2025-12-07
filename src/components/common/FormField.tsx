import React from 'react';

interface BaseFieldProps {
  id: string;
  label: string;
  error?: string | null;
  helperText?: string;
  required?: boolean;
  className?: string;
}

interface InputProps extends BaseFieldProps {
  type?: 'text' | 'number' | 'datetime-local' | 'email' | 'password';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength?: number;
}

interface TextAreaProps extends BaseFieldProps {
  type: 'textarea';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
}

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps extends BaseFieldProps {
  type: 'select';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
}

type FormFieldProps = InputProps | TextAreaProps | SelectProps;

const getInputClasses = (error?: string | null, className: string = '') => `
  w-full border rounded-md px-3 py-2 leading-tight
  focus:outline-none focus:ring-2 focus:border-transparent
  ${error ? 'border-red-500 bg-red-50 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}
  ${className}
`;

export const FormField = (props: FormFieldProps) => {
  const { id, label, error, helperText, required } = props;

  const renderField = () => {
    switch (props.type) {
      case 'textarea':
        return (
          <textarea
            id={id}
            value={props.value}
            onChange={props.onChange}
            rows={props.rows || 3}
            placeholder={props.placeholder}
            className={getInputClasses(error, props.className)}
            required={required}
          />
        );
      
      case 'select':
        return (
          <select
            id={id}
            value={props.value}
            onChange={props.onChange}
            className={getInputClasses(error, props.className)}
            required={required}
          >
            {props.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      // input (text, number, date...)
      default:
        const inputProps = props as InputProps; 
        return (
          <input
            id={id}
            type={inputProps.type || 'text'}
            value={inputProps.value}
            onChange={inputProps.onChange}
            maxLength={inputProps.maxLength}
            placeholder={inputProps.placeholder}
            className={getInputClasses(error, inputProps.className)}
            required={required}
          />
        );
    }
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {renderField()}

      {error ? (
        <p className="text-xs text-red-600 mt-1 font-medium animate-pulse">
          {error}
        </p>
      ) : helperText ? (
        <p className="text-xs text-gray-500 mt-1">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};
