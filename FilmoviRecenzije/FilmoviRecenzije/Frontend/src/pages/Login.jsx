import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);
    login({
      email: podaci.get('email'),
      lozinka: podaci.get('lozinka'),
    });
  }

  return (
    <Container className='mt-4'>
        <p>
            email: test@example.com / admin@example.com
        </p>
        <p>
            lozinka: testing123 / AdminTesting123
        </p>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='text'
            name='email'
            placeholder='example@example.hr'
            maxLength={255}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='lozinka'>
          <Form.Label>Lozinka</Form.Label>
          <Form.Control type='password' name='lozinka' required />
        </Form.Group>
        <Button variant='primary' className='gumb' type='submit'>
          Prijavi se
        </Button>
        <Button onClick={()=>navigate(`/registracija`)}>
          Registriraj se
        </Button>
      </Form>
    </Container>
  );
}