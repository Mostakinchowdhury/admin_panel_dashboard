import { Product, ProductImage, Review } from '@/app/type/product';
import { Dispatch, SetStateAction, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Skeleton } from '../ui/skeleton';
import { EditDialogWrapper, FieldConfig } from '@/app/hooks/useEdit';
import { Deletediologwrap } from '../globals/Deletediolog';
import ReadDialogWrapper from '@/app/hooks/useread';
type ProductRead = {
  product_img: string;
  id: number;
  category: string;
  name: string;
  description: string;
  price: string; // price string আকারে এসেছে
  max_price: string;
  stock: number;
  tags: string[];
  created_at: string;
  update_at: string;

  // review list
  reviews: Review[];

  // rating and review info
  review_count: number;
  average_rating?: number;

  addedtocard: number;
  added_to_cart_count: number;

  // product images
  productimgs: ProductImage[];
};
const Productrow = ({
  className,
  product,
  loading,
  handlefetch,
  setloading,
  tags,
}: {
  className?: string;
  product: Product;
  loading: boolean;
  tags: {
    id: number;
    name: string;
  }[];
  handlefetch: () => Promise<void>;
  setloading: Dispatch<SetStateAction<boolean>>;
}) => {
  const [checked, setChecked] = useState(false);

  // const productFields: FieldConfig<Product>[] = [
  //   { name: 'name', label: 'Product Name' },
  //   { name: 'description', label: 'Description', type: 'textarea' },
  //   { name: 'price', label: 'Regular Price', type: 'number' },
  //   { name: 'max_price', label: 'Max Price', type: 'number' },
  //   { name: 'stock', label: 'Stock Quantity', type: 'number' },
  //   {
  //     name: 'category',
  //     label: 'Category',
  //     type: 'text', // Could be select if we pass options
  //   },
  // ];

  const productupdateFields: FieldConfig<{
    name: string;
    description: string;
    price: string;
    max_price: string;
    stock: number;
    tags: number[];
  }>[] = [
    { name: 'name', label: 'Product Name' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'price', label: 'Price', type: 'number' },
    { name: 'max_price', label: 'Max Price', type: 'number' },
    { name: 'stock', label: 'Stock', type: 'number' },
    {
      name: 'tags',
      label: 'Tags',
      type: 'select',
      multiple: true,
      options: tags.map(item => ({ label: item.name, value: item.id })),
    },
  ];

  const initialProduct: {
    name: string;
    description: string;
    price: string;
    max_price: string;
    stock: number;
    tags: number[];
  } = {
    name: product.name,
    description: product.description,
    price: product.price,
    max_price: product.max_price,
    stock: product.stock,
    tags: product.tags.map(item => item.id),
  };

  const ReadproductFields: FieldConfig<ProductRead>[] = [
    { name: 'product_img', label: 'Image', type: 'image' },
    { name: 'name', label: 'Product Name' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'price', label: 'Regular Price', type: 'number' },
    { name: 'max_price', label: 'Max Price', type: 'number' },
    { name: 'stock', label: 'Stock Quantity', type: 'number' },
    {
      name: 'category',
      label: 'Category',
      type: 'text', // Could be select if we pass options
    },
    {
      name: 'average_rating',
      label: 'Average Rating',
      type: 'number',
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'text',
    },
    {
      name: 'created_at',
      label: 'Created At',
      type: 'date',
    },
  ];

  if (loading) {
    return <Skeleton />;
  }
  return (
    <tr
      key={product.id}
      className={`border-b transition-colors duration-200 ${checked ? 'bg-blue-50' : 'bg-white'} ${
        className ? className : ''
      } hover:bg-blue-50`}
    >
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center has-checked:bg-amber-300">
        <Checkbox
          checked={checked}
          onCheckedChange={val => setChecked(!!val)}
          className="mx-2 inline-block"
        />
        <span className="inline-block">{product.id}</span>
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center">
        {product.name}
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center">
        {product.category}
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold whitespace-nowrap text-center">
        {product.price}
      </td>
      <td className="p-3 manrope txtstlh4 font-semibold flex gap-2 items-center whitespace-nowrap text-center">
        <div className="flex gap-2 items-center justify-center w-full">
          <ReadDialogWrapper<ProductRead>
            data={{ ...product, tags: product.tags.map(itm => itm.name) }}
            fields={ReadproductFields}
            modelName="Product"
            key={product.id}
          />
          <EditDialogWrapper<typeof initialProduct>
            id={product.id}
            data={initialProduct}
            query="api/products/"
            modelName="Product"
            fields={productupdateFields}
            handlefetch={handlefetch}
          >
            <Button className="bg-primary text-white">
              <MdEdit />
            </Button>
          </EditDialogWrapper>
          <Deletediologwrap
            id={product.id}
            model="Product"
            query="product"
            setloading={setloading}
            handlefetch={handlefetch}
          >
            <Button className="bg-amber-900 text-white">
              <MdDelete />
            </Button>
          </Deletediologwrap>
        </div>
      </td>
    </tr>
  );
};

export default Productrow;
