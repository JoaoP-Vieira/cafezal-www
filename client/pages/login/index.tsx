import type { NextPage } from 'next';
import Image from 'next/image';
import React from 'react';
import Input from '../../components/Input';

import styles from '../../styles/pages/Login.module.scss';
import formButtom from '../../styles/components/buttom/FormButtom.module.scss';
import { ifError } from 'assert';

const Login: NextPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function handleSubmit(event: any) {
    event.preventDefault();
    let response = await fetch('172.0.0.1:3001/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    let json = response.json();

    console.log(json);
  }

  return (
    <section className={styles.loginSection}>
      <div>
        <Image
          src='/cooffeetable.jpg'
          alt='Login banner'
          width={1226}
          height={1133}
        />
      </div>
      <div className={styles.loginForm}>
        <h2>Login</h2>
        <form action='' onSubmit={handleSubmit}>
          <Input
            name='email'
            label='Email'
            value={email}
            type='text'
            change={setEmail}
            inputType='email'
          />
          <Input
            name='password'
            label='Password'
            value={password}
            type='password'
            change={setPassword}
            inputType={null}
          />
          <button type='submit' className={formButtom.formButtom}>
            Log In
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
