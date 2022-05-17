import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { CardInCart } from "./card-in-cart";
import { CartContext } from "../../../contexts/context";
import { Typography } from "@mui/material";
import axios from "axios";
import environment from "../../../config";
import { useToasts } from "react-toast-notifications";

export const Cart = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { cartItems, itemCount, total, clearCart, user } =
    React.useContext(CartContext);
  const { addToast } = useToasts();
  async function fetchData() {
    // You can await here
    await axios({
      url: `${environment.api}orders`,
      method: "POST",
      data: {
        user: {
          id: user.id,
        },
        products: [
          ...cartItems.map((el: any) => {
            return {
              id: el.id,
              quantity: el.soluong,
            };
          }),
        ],
        status: "Pending",
      },
      // withCredentials: true,
    })
      .then(({ data: { data } }) => {
        // Handle success
        addToast(`Success`, {
          appearance: "success",
          autoDismiss: true,
        });
        clearCart();
        setIsOpen(false);
      })
      .catch((err) => {
        addToast("Error!!", {
          appearance: "error",
          autoDismiss: true,
        });
        // Handle error
        console.log(err);
      });
  }

  return (
    <div>
      <React.Fragment key={"right"}>
        <div className="z-20 fixed right-0 top-1/2">
          <div className="relative right-0 -top-12">
            <Button
              onClick={() => {
                setIsOpen(true);
              }}
              type="button"
              variant="contained"
              color="primary"
              className="flex justify-center items-center flex-col space-y-2"
            >
              <span>{itemCount} Items</span>
              <span className="bg-white rounded-md px-4 py-1 text-blue-900">
                {`${total.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}`}
              </span>
            </Button>
          </div>
        </div>
        <Drawer
          anchor={"right"}
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <Box
            // sx={{ minWidth: "500" }}
            role="presentation"
          >
            <div
              className="space-x-3 flex justify-between items-center px-4 py-3"
              style={{ maxHeight: "10vh" }}
            >
              <div>
                <span>
                  {itemCount} Item -{" "}
                  {`${total.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}`}
                </span>
              </div>
              <div>
                <Button
                  onClick={() => {
                    fetchData();
                  }}
                  type="button"
                  variant="outlined"
                  color="success"
                  className="flex justify-center items-center flex-col space-y-2"
                  size="small"
                >
                  Checkout
                </Button>
              </div>
              <div>
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  className="flex justify-center items-center flex-col space-y-2"
                  onClick={() => {
                    clearCart();
                    setIsOpen(false);
                  }}
                  onKeyDown={() => {
                    clearCart();
                    setIsOpen(false);
                  }}
                  size="small"
                >
                  Clear cart
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  onKeyDown={() => {
                    setIsOpen(false);
                  }}
                  type="button"
                  variant="outlined"
                  color="secondary"
                  className="flex justify-center items-center flex-col space-y-2"
                >
                  x
                </Button>
              </div>
            </div>
            <Divider />
            <List
              className="overflow-y-scroll scrollbar-custom"
              sx={{ maxHeight: "90vh" }}
            >
              {cartItems.length ? (
                cartItems.map((el: any) => {
                  return (
                    <ListItem button key={el.id}>
                      <CardInCart key={el.id} product={el} />
                    </ListItem>
                  );
                })
              ) : (
                <Typography className="text-center" variant="body1">
                  Cart empty
                </Typography>
              )}
            </List>
            <Divider />
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
};
