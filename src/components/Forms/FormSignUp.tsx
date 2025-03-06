import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpInputTypes, signUpSchema } from '@utils/schema/authSchema';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AuthRepository } from '@/repository/auth_repository';
import useNotification from '@hooks/useNotification';
import { handleError } from '@utils/handleError';

type Props = {};

function FormSignUp({ }: Props) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const notification = useNotification({duration: 500});

  const methods = useForm<SignUpInputTypes>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {},
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmitHandler = async (inputs: SignUpInputTypes) => {
    try {
      setLoading(true);
      const response = await AuthRepository.register(inputs.name, inputs.email, inputs.password, inputs.phone, inputs.address, inputs.photo);
      router.push('/auth/login');
      notification.success(response.message);
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
        <Form.Label htmlFor="name">Nama</Form.Label>
        <Form.Control
          size="lg"
          type="text"
          id="name"
          placeholder="Masukkan nama kamu"
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
      <div className="mb-3">
        <Form.Label htmlFor="phone">Telepon</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text>{"+62"}</InputGroup.Text>
          <Form.Control
            size="lg"
            type="textarea"
            id="phone"
            placeholder="Masukkan nomor telepon kamu"
            isInvalid={!!errors?.phone}
            autoComplete="on"
            {...register('phone')}
          />
        </InputGroup>
        {errors?.phone?.message ? (
          <Form.Control.Feedback type="invalid" className=" pt-1">
            {errors?.phone?.message}
          </Form.Control.Feedback>
        ) : null}
      </div>
      <div className="mb-3">
        <Form.Label htmlFor="address">Alamat</Form.Label>
        <Form.Control
          as="textarea"
          size="lg"
          type="textarea"
          id="address"
          placeholder="Masukkan alamat kamu"
          isInvalid={!!errors?.address}
          autoComplete="on"
          {...register('address')}
        />
        {errors?.address?.message ? (
          <Form.Control.Feedback type="invalid" className=" pt-1">
            {errors?.address?.message}
          </Form.Control.Feedback>
        ) : null}
      </div>
      <div className="mb-3">
        <Form.Label htmlFor="photo">Photo</Form.Label>
        <Form.Control
          size="lg"
          type="file"
          id="photo"
          placeholder="Masukkan foto kamu"
          isInvalid={!!errors?.photo}
          autoComplete="on"
          multiple={false}
          {...register('photo')}
        />
        {errors?.photo?.message ? (
          <Form.Control.Feedback type="invalid" className=" pt-1">
            {errors?.photo?.message?.toString()}
          </Form.Control.Feedback>
        ) : null}
      </div>
      <div className="text-center mt-3">
        <button
          type="submit"
          className="btn btn-lg btn-primary w-100"
          disabled={loading}
        >
          Sign up
        </button>
      </div>
      <div className='mt-3'>
        <h5 className='text-center text-muted'>Already have an account?
          <span className='text-primary ms-1'>
            <Link href='/auth/login'>Login</Link>
          </span>
        </h5>
      </div>
    </Form>
  );
}

export default FormSignUp;
