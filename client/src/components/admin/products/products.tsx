import * as React from "react";
import { CardProduct } from "./card";
import { Typography } from "@mui/material";
import { MenuCustomHead } from "../common/menu";
import environment from "../../../config";
import axios from "axios";

export const Products = () => {
  const [products, setProducts] = React.useState<any[]>([]);
  React.useEffect(() => {
    async function fetchData() {
      // You can await here
      await axios({
        url: `${environment.api}products`,
        method: "GET",
        // withCredentials: true,
      })
        .then(({ data: { data: products } }: { data: { data: any[] } }) => {
          // Handle success
          setProducts(
            products.map((value) => {
              Object.keys(value).forEach((k: any) => {
                if (typeof value[k] === "object") {
                  value[k] = JSON.stringify(value[k]);
                }
              });
              return value;
            })
          );
        })
        .catch((err) => {
          console.log(err);
          // Handle error
          console.log(err);
        });
    }
    fetchData();
  }, []);
  return (
    <div className="bg-gray-200/40 -mt-4 pt-4 min-h-screen">
      <div className="flex justify-between items-center px-6 pt-6">
        <div className="">
          <h3 className="text-3xl leading-none font-bold font-serif">
            Product List
          </h3>
          <Typography
            sx={{ fontSize: 14, margin: "8px 0 0 0" }}
            color="text.secondary"
            gutterBottom
          >
            Here is our verious products.
          </Typography>
        </div>
        <div className="flex space-x-2">
          <MenuCustomHead
            options={[
              {
                key: "1",
                text: "Add product",
                path: "/admin/products/add-product",
              },
              {
                key: "2",
                text: "Import products",
                path: "/admin/products/import-products",
              },
            ]}
          />
        </div>
      </div>
      <div className="p-6">
        <CardProduct values={products} />
      </div>
    </div>
  );
};
