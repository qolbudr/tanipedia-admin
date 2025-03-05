import React from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInInputTypes, signInSchema } from '@utils/schema/authSchema';
import { useRouter } from 'next/router';

type Props = {};

function FormSignIn({}: Props) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const methods = useForm<SignInInputTypes>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: 'adminkit@adminkit.io',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmitHandler = (inputs: SignInInputTypes) => {
    setLoading(true);
    // eslint-disable-next-line no-console
    console.log(inputs);
    router.push('/');
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
          placeholder="Enter your email"
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
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
          size="lg"
          type="password"
          id="password"
          placeholder="Enter your password"
          isInvalid={!!errors?.password}
          autoComplete="on"
          {...register('password')}
        />
        {errors?.password?.message ? (
          <Form.Control.Feedback type="invalid" className=" pt-1">
            {errors?.password?.message}
          </Form.Control.Feedback>
        ) : null}
        <small>
          <a href="index.html">Forgot password?</a>
        </small>
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
          <span className="form-check-label">Remember me next time</span>
        </label>
      </div>
      <div className="text-center mt-3">
        <button
          type="submit"
          className="btn btn-lg btn-primary"
          disabled={loading}
        >
          Sign in
        </button>
        {/* <button type="submit" class="btn btn-lg btn-primary">Sign in</button> */}
      </div>
    </Form>
  );
}

export default FormSignIn;
