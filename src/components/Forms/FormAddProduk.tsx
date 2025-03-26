import { ProductRepository } from "@/repository/product_repository";
import { zodResolver } from "@hookform/resolvers/zod";
import useNotification from "@hooks/useNotification";
import { handleError } from "@utils/handleError";
import { ProductAddInputTypes, productAddSchema } from "@utils/schema/productSchema";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import 'react-quill/dist/quill.snow.css';

const FormAddProduk = ({ callback }: { callback: () => void }) => {
  const notification = useNotification({ duration: 300 });

  let methods = useForm<ProductAddInputTypes>({
    resolver: zodResolver(productAddSchema),
    defaultValues: {},
  });

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmitHandler = async (inputs: ProductAddInputTypes) => {
    try {
      const response = await ProductRepository.addProduct({
        name: inputs.name,
        description: inputs.description,
        price: inputs.price.toString(),
        unit: inputs.unit,
        category: inputs.category,
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
        <Form.Label htmlFor="name">Nama</Form.Label>
        <Form.Control
          size="lg"
          type="text"
          id="name"
          placeholder="Masukkan nama produk"
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
        <Form.Label htmlFor="description">Deskripsi</Form.Label>
        <Form.Control
          as="textarea"
          size="lg"
          rows={5}
          type="textarea"
          id="description"
          placeholder="Masukkan deskripsi produk"
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
      <Row>
        <Col sm={6}>
          <div className="mb-3">
            <Form.Label htmlFor="price">Harga</Form.Label>
            <Form.Control
              size="lg"
              type="number"
              id="price"
              placeholder="Masukkan harga produk"
              isInvalid={!!errors?.price}
              {...register('price')}
            />
            {errors?.price?.message ? (
              <Form.Control.Feedback type="invalid" className=" pt-1">
                {errors?.price?.message}
              </Form.Control.Feedback>
            ) : null}
          </div>
        </Col>
        <Col sm={6}>
          <div className="mb-3">
            <Form.Label htmlFor="unit">Unit</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              id="unit"
              placeholder="Masukkan unit produk"
              isInvalid={!!errors?.unit}
              {...register('unit')}
            />
            {errors?.unit?.message ? (
              <Form.Control.Feedback type="invalid" className=" pt-1">
                {errors?.unit?.message}
              </Form.Control.Feedback>
            ) : null}
          </div>
        </Col>
      </Row>

      <div className="mb-3">
        <Form.Label htmlFor="category">Kategori</Form.Label>
        <Form.Select
          size="lg"
          id="category"
          placeholder="Masukkan kategori video"
          isInvalid={!!errors?.category}
          autoComplete="on"
          {...register('category')}
        >
          <option value={"buah"}>Buah</option>
          <option value={"sayur"}>Sayur</option>
          <option value={"bibit"}>Bibit</option>
          <option value={"pupuk"}>Pupuk</option>
          <option value={"biji"}>Biji Bijian</option>
        </Form.Select>
        {errors?.category?.message ? (
          <Form.Control.Feedback type="invalid" className=" pt-1">
            {errors?.category?.message}
          </Form.Control.Feedback>
        ) : null}
      </div>

      <div className="mb-3">
        <Form.Label htmlFor="image">Gambar</Form.Label>
        <Form.Control
          size="lg"
          type="file"
          id="image"
          placeholder="Masukkan gambar produk"
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

export default FormAddProduk;