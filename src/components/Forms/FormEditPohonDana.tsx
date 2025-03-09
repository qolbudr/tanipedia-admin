import { ArticleRepository } from "@/repository/article_repository";
import { PohonDanaRepository } from "@/repository/pohon_dana_repository";
import { zodResolver } from "@hookform/resolvers/zod";
import useNotification from "@hooks/useNotification";
import { PohonDana } from "@prisma/client";
import { handleError } from "@utils/handleError";
import { ArticleAddInputTypes, articleAddSchema } from "@utils/schema/articleSchema";
import { PohonDanaAddInputTypes, pohonDanaAddSchema, PohonDanaEditInputTypes } from "@utils/schema/pohonDanaSchema";
import dynamic from "next/dynamic";
import { useEffect, useMemo } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import 'react-quill/dist/quill.snow.css';

const FormEditPohonDana = ({ callback, pohonDana }: { callback: () => void, pohonDana : PohonDana }) => {
  const notification = useNotification({ duration: 300 });
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline'],
      ['link', 'image'],
    ],
  };

  let methods = useForm<PohonDanaAddInputTypes>({
    resolver: zodResolver(pohonDanaAddSchema),
    defaultValues: {},
  });

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (pohonDana) {
      setValue('title', pohonDana.title);
      setValue('description', pohonDana.description);
      setValue('link', pohonDana.link);
    }
  }, [pohonDana])

  const onSubmitHandler = async (inputs: PohonDanaEditInputTypes) => {
    try {
      if (pohonDana) {
        const data: PohonDana = {
          ...pohonDana,
          title: inputs.title,
          description: inputs.description,
          link: inputs.link,
          image: inputs.image,
        }
        const response = await PohonDanaRepository.updatePohonDana({
          id: pohonDana.id,
          title: inputs.title,
          description: inputs.description,
          link: inputs.link,
          image: inputs.image,
        });
        if (response) notification.success(response.message);
        callback();
      }
    } catch (e) {
      notification.danger(handleError(e))
    }
  };

  return (
    <Form method="POST" onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="mb-3">
        <Form.Label htmlFor="title">Judul</Form.Label>
        <Form.Control
          size="lg"
          type="text"
          id="title"
          placeholder="Masukkan judul pohon dana"
          isInvalid={!!errors?.title}
          {...register('title')}
        />
        {errors?.title?.message ? (
          <Form.Control.Feedback type="invalid" className=" pt-1">
            {errors?.title?.message}
          </Form.Control.Feedback>
        ) : null}
      </div>
      <div className="mb-3">
        <Form.Label htmlFor="description">Deskripsi</Form.Label>
        <Form.Control
          as="textarea"
          size="lg"
          type="textarea"
          id="description"
          placeholder="Masukkan deskripsi pohon dana"
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
      <div className="mb-3">
        <Form.Label htmlFor="link">Link</Form.Label>
        <Form.Control
          size="lg"
          type="text"
          id="link"
          placeholder="Masukkan link pohon dana"
          isInvalid={!!errors?.link}
          {...register('link')}
        />
        {errors?.link?.message ? (
          <Form.Control.Feedback type="invalid" className=" pt-1">
            {errors?.link?.message}
          </Form.Control.Feedback>
        ) : null}
      </div>
      <div className="mb-3">
        <Form.Label htmlFor="image">Gambar</Form.Label>
        <Form.Control
          size="lg"
          type="file"
          id="image"
          placeholder="Masukkan gambar pohon dana"
          isInvalid={!!errors?.image}
          autoComplete="on"
          multiple={false}
          {...register('image')}
        />
        {errors?.image?.message ? (
          <Form.Control.Feedback type="invalid" className=" pt-1">
            {errors?.image?.message?.toString()}
          </Form.Control.Feedback>
        ) : null}
      </div>
      <div className="mt-4">
        <Button type="submit" className="btn btn-lg w-100">Simpan</Button>
      </div>
    </Form>
  );
}

export default FormEditPohonDana;