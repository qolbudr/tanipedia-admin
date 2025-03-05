import React from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpInputTypes, signUpSchema } from '@utils/schema/authSchema';
import { useRouter } from 'next/router';

type Props = {};

function FormSignUp({}: Props) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const methods = useForm<SignUpInputTypes>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: 'adminkit',
      email: 'adminkit@adminkit.io',
      company: 'adminkit',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmitHandler = (inputs: SignUpInputTypes) => {
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
        <Form.Label htmlFor="name">Name</Form.Label>
        <Form.Control
          size="lg"
          type="text"
          id="name"
          placeholder="Enter your name"
          isInvalid={!!errors?.name}
          {...register('name')}
        />
        {errors?.name?.message ? (
          <Form.Control.Feedback type="invalid" className=" pt-1">
            {errors?.name?.message}
          </Form.Control.Feedback>
        ) : null}
      </div>
      <div className="mb-3">
        <Form.Label htmlFor="company">Company</Form.Label>
        <Form.Control
          size="lg"
          type="text"
          id="company"
          placeholder="Enter your company name"
          isInvalid={!!errors?.company}
          {...register('company')}
        />
        {errors?.company?.message ? (
          <Form.Control.Feedback type="invalid" className=" pt-1">
            {errors?.company?.message}
          </Form.Control.Feedback>
        ) : null}
      </div>
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
          placeholder="Enter password"
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
      <div className="text-center mt-3">
        <button
          type="submit"
          className="btn btn-lg btn-primary"
          disabled={loading}
        >
          Sign up
        </button>
      </div>
    </Form>
  );
}

export default FormSignUp;
