import React from 'react';
import { GetUserService } from '../..//libs/openapi';

export const Home: React.FC = () => {
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const email = e.currentTarget.email.value;
    const password  = e.currentTarget.password.value;

    try {
      const response = await GetUserService.getUserById(email, password);
      console.log(response);
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <div>
      <form method="get" onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleLogin(e)}>
        <input type="text" name="email" id='email' placeholder='email' />
        <input type="password" name="password" id='password' placeholder='password'/>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};
