import { UserRepository } from "@/repository/user_repository";
import { zodResolver } from "@hookform/resolvers/zod";
import useNotification from "@hooks/useNotification";
import { Users } from "@prisma/client";
import { handleError } from "@utils/handleError";
import { UserEditInputTypes, userEditSchema } from "@utils/schema/userSchema";
import { useEffect } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

const FormEditPengguna = ({ user, callback }: { user?: Users, callback: () => void }) => {
  const notification = useNotification({ duration: 300 });
  let methods = useForm<UserEditInputTypes>({
    resolver: zodResolver(userEditSchema),
    defaultValues: {},
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('phone', user.phone);
      setValue('address', user.address);
    }
  }, [user])

  const onSubmitHandler = async (inputs: UserEditInputTypes) => {
    try {
      if (user) {
        const data: Users = {
          ...user,
          name: inputs.name,
          phone: inputs.phone,
          email: inputs.email,
          address: inputs.address,
        }
        const response = await UserRepository.updateUser({ id: `${data.id}`, user: data });
        if(response) notification.success(response.message);
        callback();
      }
    } catch (e) {
      notification.danger(handleError(e))
    }
  };

  return (
    <Form method="POST" onSubmit={handleSubmit(onSubmitHandler)}>
      <div>
        <Form.Label htmlFor="email">Nama</Form.Label>
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
      <div className="mt-2">
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
      <div className="mt-2">
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
      <div className="mt-2">
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
      <div className="mt-4">
        <Button type="submit" className="btn btn-lg w-100">Simpan</Button>
      </div>
    </Form>
  );
}

export default FormEditPengguna;