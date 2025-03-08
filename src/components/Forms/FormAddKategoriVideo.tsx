import { UserRepository } from "@/repository/user_repository";
import { VideoRepository } from "@/repository/video_repository";
import { zodResolver } from "@hookform/resolvers/zod";
import useNotification from "@hooks/useNotification";
import { Users, VideoCategory } from "@prisma/client";
import { handleError } from "@utils/handleError";
import { UserEditInputTypes, userEditSchema } from "@utils/schema/userSchema";
import { VideoCategoryInputTypes, videoCategorySchema } from "@utils/schema/videoCategorySchema";
import { useEffect } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

const FormAddKategoriVideo = ({ callback }: { callback: () => void }) => {
  const notification = useNotification({ duration: 300 });
  let methods = useForm<VideoCategoryInputTypes>({
    resolver: zodResolver(videoCategorySchema),
    defaultValues: {},
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmitHandler = async (inputs: VideoCategoryInputTypes) => {
    try {
      const response = await VideoRepository.createVideoCategory({ title: inputs.title, description: inputs.description });
      if (response) notification.success(response.message);
      callback();
    } catch (e) {
      notification.danger(handleError(e))
    }
  };

  return (
    <Form method="POST" onSubmit={handleSubmit(onSubmitHandler)}>
      <div>
        <Form.Label htmlFor="title">Title</Form.Label>
        <Form.Control
          size="lg"
          type="text"
          id="title"
          placeholder="Masukkan judul kategori video"
          isInvalid={!!errors?.title}
          {...register('title')}
        />
        {errors?.title?.message ? (
          <Form.Control.Feedback type="invalid" className=" pt-1">
            {errors?.title?.message}
          </Form.Control.Feedback>
        ) : null}
      </div>
      <div className="mt-2">
        <Form.Label htmlFor="description">Deskripsi</Form.Label>
        <Form.Control
          as="textarea"
          size="lg"
          type="textarea"
          id="description"
          placeholder="Masukkan deskripsi kategori video"
          isInvalid={!!errors?.description}
          autoComplete="on"
          {...register('description')}
        />
        {errors?.description?.message ? (
          <Form.Control.Feedback type="invalid" className=" pt-1">
            {errors?.description?.message}
          </Form.Control.Feedback>
        ) : null}
      </div>
      <div className="mt-4">
        <Button type="submit" className="btn btn-lg w-100">Simpan</Button>
      </div>
    </Form>
  );
}

export default FormAddKategoriVideo;