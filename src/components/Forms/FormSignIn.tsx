import React from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInInputTypes, signInSchema } from '@utils/schema/authSchema';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AuthRepository } from '@/repository/auth_repository';
import useNotification from '@hooks/useNotification';
import { handleError } from '@utils/handleError';

type Props = {};

function FormSignIn({ }: Props) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const notification = useNotification({duration: 500});

  const methods = useForm<SignInInputTypes>({
    resolver: zodResolver(signInSchema),
    defaultValues: {},
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmitHandler = async (inputs: SignInInputTypes) => {
    try {
      setLoading(true);
      const response = await AuthRepository.login(inputs.email, inputs.password);
      router.push('/');
    } catch (e) {
      notification.danger(handleError(e))
      setLoading(false);
    }
  };

  React.useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <Form method="POST" onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="mb-3">
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Control
          size="lg"
          type="email"
          id="email"
          placeholder="Masukkan email kamu"
          isInvalid={!!errors?.email}
          {...register('email')}
        />
        {errors?.email?.message ? (
          <Form.Control.Feedback type="invalid" className=" pt-1">
            {errors?.email?.message}
          </Form.Control.Feedback>
        ) : null}
      </div>
      <div className="mb-3">
        <Form.Label htmlFor="password">Kata Sandi</Form.Label>
        <Form.Control
          size="lg"
          type="password"
          id="password"
          placeholder="Masukkan kata sandi kamu"
          isInvalid={!!errors?.password}
          autoComplete="on"
          {...register('password')}
        />
        {errors?.password?.message ? (
          <Form.Control.Feedback type="invalid" className=" pt-1">
            {errors?.password?.message}
          </Form.Control.Feedback>
        ) : null}
      </div>
      <div>
        <label className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            defaultValue="remember-me"
            name="remember-me"
            defaultChecked
          />
          <span className="form-check-label">Ingat saya</span>
        </label>
      </div>
      <div className="text-center mt-3">
        <button
          type="submit"
          className="btn btn-lg btn-primary w-100"
          disabled={loading}
        >
          Sign in
        </button>
        {/* <button type="submit" class="btn btn-lg btn-primary">Sign in</button> */}
      </div>
      <div className='mt-3'>
        <h5 className='text-center text-muted'>Belum punya akun?
          <span className='text-primary ms-1'>
            <Link href='/auth/signup'>Daftar</Link>
          </span>
        </h5>
      </div>
    </Form>
  );
}

export default FormSignIn;
