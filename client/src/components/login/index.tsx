import {
  Card,
  CardContent,
  Box,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import * as React from "react";
import { useFormik } from "formik";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import environment from "../../config";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/context";

export const Login = () => {
  const { addToast } = useToasts();
  const navigate = useNavigate();
  const { login } = React.useContext(CartContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        formik.setSubmitting(true);
        // code there
        axios({
          url: `${environment.api}login`,
          method: "POST",
          data: {
            ...values,
          },
          withCredentials: true,
        })
          .then(({ data }) => {
            // Handle success
            console.log(data);
            if (data.data.roles.includes("Admin")) {
              login({ isLogin: true, isAdmin: true, user: data.data });
              navigate("/admin");
            } else {
              login({ isLogin: true, isAdmin: false, user: data.data });
              navigate("/home");
            }
            addToast(`Success`, {
              appearance: "success",
              autoDismiss: true,
            });
          })
          .catch((err) => {
            console.log(err);
            // Handle error
            addToast("Error!!", {
              appearance: "error",
              autoDismiss: true,
            });
          });
        formik.setSubmitting(false);
      } catch (error) {
        // Handle error
        addToast("Error!!", {
          appearance: "error",
          autoDismiss: true,
        });
        console.log(error);
        formik.setSubmitting(false);
      }
    },
  });
  return (
    <div className="bg-gray-200/40 -mt-4 pt-4 min-h-screen">
      <div className="flex justify-between items-center px-6 pt-6">
        <div className="">
          <h3 className="text-3xl leading-none font-bold font-serif">Login</h3>
        </div>
      </div>
      <div className="p-6">
        <Card sx={{ minWidth: 0, height: "100%" }}>
          <CardContent>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1 },
              }}
              noValidate
              autoComplete="off"
              onSubmit={formik.handleSubmit}
              className="grid grid-cols-3 gap-3"
            >
              <FormControl variant="standard" className="col-span-1">
                <TextField
                  id="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  label="Email"
                  name="email"
                  type="email"
                  required
                />
              </FormControl>
              <FormControl variant="standard" className="col-span-1">
                <TextField
                  id="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  label="Password"
                  name="password"
                  type="password"
                  required
                />
              </FormControl>
              <Button type="submit" variant="contained">
                Login
              </Button>
            </Box>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
