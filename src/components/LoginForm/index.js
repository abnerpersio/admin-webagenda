import { useRef, useContext, useState } from 'react';
import { Form } from './styles';

import Button from '../Button';
import Input from '../Input';

import { AuthContext } from '../../context/AuthProvider';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const UsernameInputRef = useRef('');
  const PasswordInputRef = useRef('');
  const { login, isLoading } = useContext(AuthContext);

  function handleSubmit() {
    login({
      username: UsernameInputRef.current.value,
      password: PasswordInputRef.current.value,
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
      <Input placeholder="Nome de usuário" ref={UsernameInputRef} />

      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder="Senha"
        ref={PasswordInputRef}
      />
      <button
        className="toggle-password"
        type="button"
        onClick={togglePassword}
      >
        {showPassword ? 'Ocultar senha' : 'Mostrar senha'}
      </button>

      <Button type="submit" isLoading={isLoading}>
        {isLoading ? 'carregando...' : 'Entrar'}
      </Button>
    </Form>
  );
}
