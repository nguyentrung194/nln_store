import * as React from "react";
import { CardMedia, Box, Card, Chip, Typography, Button } from "@mui/material";
import { CartContext } from "../../../contexts/context";

export const CardInCart = ({ product }: any) => {
  const { increase, decrease, removeProduct, cartItems } =
    React.useContext(CartContext);
  return (
    <Card className="flex justify-around items-center w-full space-x-2 px-4 py-1">
      <div className="bg-green-200/50 rounded-md py-2 px-1 m-1 flex justify-around flex-col items-center">
        <Button
          sx={{
            minWidth: "40px",
          }}
          size="small"
          className="p-1 text-center"
          variant="text"
          onClick={() => {
            increase(product);
          }}
        >
          +
        </Button>
        <Typography className="p-0 text-center" variant="inherit">
          {cartItems[cartItems.findIndex((item: any) => item.id === product.id)]
            ?.soluong || 0}
        </Typography>
        <Button
          sx={{
            minWidth: "40px",
          }}
          size="small"
          className="p-1 text-center"
          variant="text"
          onClick={() => {
            decrease(product);
          }}
        >
          -
        </Button>
      </div>
      <CardMedia
        component="img"
        sx={{ width: 100 }}
        image="/images/products/product.jpg"
        alt="Items in cart"
      />
      <div className="py-2 px-1 m-1">
        <Typography className="p-0 text-left" variant="inherit">
          Roadster Women Solid Top
        </Typography>
        <Typography className="p-0 text-left" variant="inherit">
          Price:{" "}
          {product.price.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </Typography>
        <Typography className="p-0 text-left" variant="inherit">
          Total of item:{" "}
          {`${(
            product.price *
            (cartItems[
              cartItems.findIndex((item: any) => item.id === product.id)
            ]?.soluong || 0)
          ).toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}`}
        </Typography>
      </div>
      <Box className="">
        <Chip
          label="Xoa"
          onDelete={() => {
            removeProduct(product);
          }}
        />
      </Box>
    </Card>
  );
};
