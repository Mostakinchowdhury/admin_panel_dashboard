import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
// create a conext for user page

const productpagecontext = createContext<{
  product_sortopen: boolean;
  product_setsortopen: Dispatch<SetStateAction<boolean>>;
  product_filteropen: boolean;
  product_setfilteropen: Dispatch<SetStateAction<boolean>>;
  product_sortby: string;
  product_setsortby: Dispatch<SetStateAction<string>>;
} | null>(null);

export const Productpageprovider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [product_sortopen, product_setsortopen] = useState<boolean>(false);
  const [product_filteropen, product_setfilteropen] = useState<boolean>(false);
  const [product_sortby, product_setsortby] = useState<string>('df');
  const values = {
    product_sortopen,
    product_setsortopen,
    product_filteropen,
    product_setfilteropen,
    product_sortby,
    product_setsortby,
  };
  return (
    <productpagecontext.Provider value={values}>
      {children}
    </productpagecontext.Provider>
  );
};

export default function useProductcontext() {
  const context = useContext(productpagecontext);
  if (!context) {
    throw new Error(
      'useProductcontext must be used within a Productpageprovider',
    );
  }
  return context;
}
