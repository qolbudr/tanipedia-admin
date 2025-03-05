import React from 'react';

type Props = {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: Props) {
  const [value, setValue] = React.useState<number | string>(initialValue);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return <input {...props} value={value} onChange={handleInputChange} />;
}

DebouncedInput.defaultProps = {
  debounce: 500,
} as Partial<Props>;

export default DebouncedInput;
