import React, {
  InputHTMLAttributes,
  ReactNode,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from 'react';

import styles from '../styles/components/input/FormImput.module.scss';

interface InputProps extends InputHTMLAttributes<ReactNode> {
  label: string;
  change: Dispatch<SetStateAction<string>>;
  inputType: 'email' | 'number' | null;
}

const types = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@cafezal.com/,
    message: 'Preencha um e-mail válido',
  },
  number: {
    regex: /^\d+$/,
    message: 'Utilize somente números',
  },
};

const Input = (props: InputProps) => {
  const [error, setError] = React.useState('');

  function validate() {
    if (props.inputType === null) return true;
    if (String(props.value).length === 0) {
      setError('Prencha um valor.');
      return false;
    } else if (
      types[props.inputType] &&
      !types[props.inputType].regex.test(String(props.value))
    ) {
      setError(types[props.inputType].message);
      return false;
    } else {
      setError('');
      return true;
    }
  }

  return (
    <div className='formDiv'>
      <label htmlFor={props.name} className={styles.formLabel}>
        {props.label}
      </label>
      <input
        type={props.type}
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          props.change(event.target.value);
        }}
        onBlur={() => validate()}
        className={styles.formInput}
        style={error ? { marginBottom: '.25em' } : {}}
      />
      {error && <span className={styles.formError}>{error}</span>}
    </div>
  );
};

export default Input;
