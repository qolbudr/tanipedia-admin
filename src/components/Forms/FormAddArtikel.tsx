import { ArticleRepository } from "@/repository/article_repository";
import { zodResolver } from "@hookform/resolvers/zod";
import useNotification from "@hooks/useNotification";
import { handleError } from "@utils/handleError";
import { ArticleAddInputTypes, articleAddSchema } from "@utils/schema/articleSchema";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import 'react-quill/dist/quill.snow.css';

const FormAddArtikel = ({ callback }: { callback: () => void }) => {
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

  let methods = useForm<ArticleAddInputTypes>({
    resolver: zodResolver(articleAddSchema),
    defaultValues: {},
  });

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmitHandler = async (inputs: ArticleAddInputTypes) => {
    try {
      const response = await ArticleRepository.addArticle({ 
        title: inputs.title,
        description: inputs.description,
        content: inputs.content,
        image: inputs.image,
      });
      
      if (response) notification.success(response.message);
      callback();
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
          placeholder="Masukkan judul artikel"
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
          placeholder="Masukkan deskripsi artikel"
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
        <Form.Label htmlFor="content">Konten</Form.Label>
        <ReactQuill modules={modules} value={watch('content')} onChange={(value) => setValue('content', value)} theme="snow" />
        {errors?.content?.message ? (
          <Form.Control.Feedback type="invalid" className=" pt-1">
            {errors?.content?.message}
          </Form.Control.Feedback>
        ) : null}
      </div>
      <div className="mb-3">
        <Form.Label htmlFor="image">Gambar</Form.Label>
        <Form.Control
          size="lg"
          type="file"
          id="image"
          placeholder="Masukkan gambar artikel"
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

export default FormAddArtikel;