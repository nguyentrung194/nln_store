import { Button, Divider } from "@mui/material";
import axios from "axios";
import * as React from "react";
import environment from "../../config";
import { CarouselMulti } from "./carousel-multi";
import { Cart } from "./cart/cart";
import { Categories } from "./categoris";
import { Product } from "./product/card";
import { Search } from "./search";
import { useQueryURL } from "../../hooks/use-query-url";

export const Langiding = () => {
  const query = useQueryURL();
  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    async function fetchData() {
      // You can await here
      await axios({
        url: `${environment.api}products`,
        method: "GET",
        params: {
          search: query.get("search"),
        },
        // withCredentials: true,
      })
        .then(({ data: { data } }) => {
          // Handle success
          setProducts(data);
        })
        .catch((err) => {
          console.log(err);
          // Handle error
        });
    }
    fetchData();
  }, [query.get("search")]);
  return (
    <div>
      <div>
        <Cart />
      </div>
      <div
        style={{ backgroundImage: `url("/images/langding.jpg")` }}
        className="min-h-screen bg-cover flex justify-center items-center -my-7 h-full"
      >
        <div className="flex justify-center items-center flex-col">
          <h1 className="pb-4 text-6xl leading-none font-medium font-serif">
            My coffee shop
          </h1>
          <p className="pb-4 text-gray-500 leading-normal">
            Buy coffee beans, coffee machines and accessories online for your
            workplace or home.
          </p>
          <Search />
        </div>
      </div>
      <div className="my-20">
        <CarouselMulti />
      </div>
      <Divider />
      <div className="flex">
        <div className="py-8 px-1 w-2/12 sticky top-20 h-full">
          <Categories />
        </div>
        <div className="py-8 px-3 w-9/12 min-h-screen">
          <div className="grid grid-cols-3 gap-4">
            {products.map((el: any) => {
              return <Product product={{ ...el, rank: 4.3, rankers: 16 }} />;
            })}
          </div>
          <div className="p-16 flex justify-center items-center">
            <Button variant="contained">Load more</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
