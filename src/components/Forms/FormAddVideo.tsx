import { UserRepository } from "@/repository/user_repository";
import { VideoRepository } from "@/repository/video_repository";
import { zodResolver } from "@hookform/resolvers/zod";
import useNotification from "@hooks/useNotification";
import { VideoCategory } from "@prisma/client";
import { handleError } from "@utils/handleError";
import { VideoInputTypes, videoSchema } from "@utils/schema/videoSchema";
import { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

const FormAddVideo = ({ callback }: { callback: () => void }) => {
  const notification = useNotification({ duration: 300 });
  const [categories, setCategories] = useState<VideoCategory[]>([])
  let methods = useForm<VideoInputTypes>({
    resolver: zodResolver(videoSchema),
    defaultValues: {},
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => { getCategories() }, [])

  const getCategories = async () => {
    try {
      const response = await VideoRepository.getVideoCategories({ limit: 10000, offset: 0, search: "" });
      setCategories(response?.data ?? []);
      if(response && response.data.length > 0) setValue('categoryId', response.data[0].id.toString());
    } catch (e) {
      notification.danger(handleError(e))
    }
  }

  const onSubmitHandler = async (inputs: VideoInputTypes) => {
    try {
      const response = await VideoRepository.createVideo({ title: inputs.title, description: inputs.description, link: inputs.link, categoryId: parseInt(inputs.categoryId) });
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
      <div className="mt-2">
        <Form.Label htmlFor="link">Link</Form.Label>
        <Form.Control
          size="lg"
          type="textarea"
          id="link"
          placeholder="Masukkan link video"
          isInvalid={!!errors?.link}
          autoComplete="on"
          {...register('link')}
        />
        {errors?.link?.message ? (
          <Form.Control.Feedback type="invalid" className=" pt-1">
            {errors?.link?.message}
          </Form.Control.Feedback>
        ) : null}
      </div>
      <div className="mt-2">
        <Form.Label htmlFor="categoryId">Kategori</Form.Label>
        <Form.Select
          size="lg"
          id="categoryId"
          placeholder="Masukkan kategori video"
          isInvalid={!!errors?.categoryId}
          autoComplete="on"
          {...register('categoryId')}
        >
          {
            ...categories.map((e) => 
              <option key={e.id} value={e.id}>{e.title}</option>
            )
          }
        </Form.Select>
        {errors?.categoryId?.message ? (
          <Form.Control.Feedback type="invalid" className=" pt-1">
            {errors?.categoryId?.message}
          </Form.Control.Feedback>
        ) : null}
      </div>
      <div className="mt-4">
        <Button type="submit" className="btn btn-lg w-100">Simpan</Button>
      </div>
    </Form>
  );
}

export default FormAddVideo;