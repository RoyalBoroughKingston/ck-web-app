import React, { ChangeEvent } from 'react';
import { observer } from 'mobx-react';

import './Select.scss';

interface IOption {
  value: string;
  text: string;
}

interface IProps {
  options: IOption[];
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  placeholder: string;
  id: string;
  disabled?: boolean;
}

const Select: React.FunctionComponent<IProps> = ({
  options,
  onChange,
  className,
  placeholder,
  id,
  disabled,
}) => (
  <select
    className={`select ${className}`}
    onChange={onChange}
    id={id}
    defaultValue={placeholder}
    disabled={disabled}
  >
    <option value={placeholder} disabled={true} hidden={true}>
      {placeholder}
    </option>
    {options.map(({ value, text }) => (
      <option key={value} value={value}>
        {text}
      </option>
    ))}
  </select>
);

export default observer(Select);
