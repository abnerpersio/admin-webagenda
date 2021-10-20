import { useContext, useState } from 'react';
import { Form } from './styles';

import Button from '../Button';
import Input from '../Input';

import { AuthContext } from '../../context/AuthProvider';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useContext(AuthContext);

  const isFormValid = (
    username
    && password
  );

  function handleSubmit() {
    login({
      username,
      password,
    });
  }

  function togglePassword() {
    setShowPassword((prevState) => !prevState);
  }

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <h2>É bom ter você de volta!</h2>
      <Input
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Nome de usuário"
      />

      <Input
        onChange={(e) => setPassword(e.target.value)}
        type={showPassword ? 'text' : 'password'}
        placeholder="Senha"
      />

      <button
        className="toggle-password"
        type="button"
        onClick={togglePassword}
      >
        {showPassword ? 'Ocultar senha' : 'Mostrar senha'}
      </button>

      <Button
        disabled={!isFormValid}
        type="submit"
        isLoading={isLoading}
      >
        {isLoading ? 'carregando...' : 'Entrar'}
      </Button>
    </Form>
  );
}
