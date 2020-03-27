import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Layout, Form, Input, Button } from '../Components';
import { signUserIn, setLocalStorage, CONSTANTS } from '../utils';

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export function Signin(): ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email.length === 0) {
      alert(`Please provide email.`);
      return;
    }

    if (password.length === 0) {
      alert(`Please provide password.`);
      return;
    }

    const [user, error] = await signUserIn(email, password);

    if (user?.user) {
      setLocalStorage(CONSTANTS.TOKEN, user?.user?.refreshToken);
      history.push('/');
    }
  };

  return (
    <Layout>
      <FormWrapper>
        <h2>Sign In</h2>
        <Form onSubmit={handleSubmit}>
          <label htmlFor="email">
            Email
            <Input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>

          <label htmlFor="password">
            Password
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <Button type="submit">Sign In</Button>
        </Form>
      </FormWrapper>
    </Layout>
  );
}
