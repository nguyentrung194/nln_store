import {
  Card,
  CardContent,
  Box,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
  Checkbox,
  FormControlLabel,
  CardMedia,
} from "@mui/material";
import * as React from "react";
import { useFormik } from "formik";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import environment from "../../../config";
import { storage } from "../../../hooks/use-firebase";
import { useParams } from "react-router-dom";

export const EditProduct = () => {
  const { addToast } = useToasts();
  const [categories, setCategories] = React.useState<any[]>([]);
  const [state, setState] = React.useState<{ selections: string[] }>({
    selections: [],
  });
  function handleCheckboxChange(key: string) {
    let sel = state.selections;
    let find = sel.indexOf(key);
    if (find > -1) {
      sel.splice(find, 1);
    } else {
      sel.push(key);
    }

    setState({
      selections: sel,
    });
    formik.setFieldValue("categories", sel);
  }
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchData(id: string) {
      // You can await here
      await axios({
        url: `${environment.api}products/${id}`,
        method: "GET",
        // withCredentials: true,
      })
        .then(({ data: { data } }) => {
          // Handle success
          setState({
            selections: data.categories,
          });
          formik.setValues(data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
          // Handle error
          console.log(err);
        });
    }
    if (id) {
      fetchData(id);
    }
  }, [id]);

  React.useEffect(() => {
    async function fetchData() {
      // You can await here
      await axios({
        url: `${environment.api}categories`,
        method: "GET",
        // withCredentials: true,
      })
        .then(({ data: { data: categories } }: { data: { data: any[] } }) => {
          // Handle success
          setCategories(
            categories.map((value) => {
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

  const formik = useFormik({
    initialValues: {
      name: "",
      quantity: 0,
      description: "",
      categories: [],
      unit: "",
      price: "",
      images: [],
      status: "",
    },
    onSubmit: async (values) => {
      try {
        formik.setSubmitting(true);
        // code there
        console.log(values);
        axios({
          url: `${environment.api}products/${id}`,
          method: "PUT",
          data: {
            name: values.name,
            quantity: values.quantity,
            description: values.description,
            categories: values.categories,
            unit: values.unit,
            price: values.price,
            images: values.images,
            status: values.status,
          },
          // withCredentials: true,
        })
          .then(({ data }) => {
            // Handle success
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
          <h3 className="text-3xl leading-none font-bold font-serif">
            Edit Product with id: {id}
          </h3>
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
                  id="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  label="Name"
                  name="name"
                  required
                />
              </FormControl>
              <FormControl variant="standard" className="col-span-1">
                <TextField
                  id="Quantity"
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                  label="Quantity"
                  name="quantity"
                  required
                  type="number"
                />
              </FormControl>
              <FormControl variant="standard" className="col-span-1">
                <TextField
                  id="Description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  label="Description"
                  name="description"
                  required
                />
              </FormControl>
              <FormControl variant="standard" className="col-span-1">
                {categories.map((el) => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={() => handleCheckboxChange(el.name)}
                          checked={state.selections.includes(el.name)}
                        />
                      }
                      label={el.name}
                    />
                  );
                })}
              </FormControl>
              <div className="col-span-1 flex items-center">
                <FormControl fullWidth>
                  <InputLabel id="Select-Product-Type-label">
                    Select Product Unit
                  </InputLabel>
                  <Select
                    labelId="Select-Product-Type-label"
                    id="Select-Product-Type"
                    label="Select Product Type"
                    value={formik.values.unit}
                    onChange={(event: SelectChangeEvent) => {
                      formik.setFieldValue("unit", event.target.value);
                    }}
                  >
                    <MenuItem value={"pc(s)"}>pc(s)</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <FormControl variant="standard" className="col-span-1">
                <TextField
                  id="Price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  label="Price"
                  name="price"
                  required
                  type="number"
                />
              </FormControl>
              <div className="col-span-1 row-span-2 flex items-start flex-col">
                {formik.values.images.length
                  ? formik.values.images.map((el) => {
                      return (
                        <CardMedia
                          component="img"
                          height="100"
                          sx={{ maxWidth: 100 }}
                          image={`${el}`}
                          alt="green iguana"
                        />
                      );
                    })
                  : ""}
                <div className="flex items-center">
                  <label className="h-full cursor-pointer border px-3 py-1.5 flex items-center justify-center w-full text-center hover:bg-slate-100 rou custom-file-upload">
                    <input
                      aria-label="File browser"
                      className="hidden"
                      name="images"
                      type="file"
                      multiple
                      accept="image/png,image/jpeg,image/jpg"
                      onChange={(e) => {
                        console.log(storage);
                        formik.setSubmitting(true);
                        const uploadFiles = Array.from(
                          e.target.files as FileList
                        ).map(async (file: File) => {
                          const storageRef = storage.ref();
                          const ref = storageRef.child(`assert/${file.name}`);
                          const metadata = {
                            size: file.size,
                            contentType: file.type,
                            name: file.name,
                          };
                          await ref.put(file, metadata);
                          const assetUrl = await ref.getDownloadURL();
                          formik.setSubmitting(false);
                          return { ...metadata, assetUrl };
                        });
                        console.log(uploadFiles);
                        Promise.all(uploadFiles)
                          .then(async (result) => {
                            formik.setFieldValue(
                              "images",
                              result.map((el) => {
                                return el.assetUrl;
                              })
                            );
                          })
                          .catch((error) => {
                            console.log(error.message);
                          });
                      }}
                    />
                    Upload Photo
                  </label>
                </div>
              </div>
              <div className="col-span-1 flex items-center">
                <FormControl fullWidth>
                  <InputLabel id="Status-label">Select an status</InputLabel>
                  <Select
                    labelId="Status-label"
                    id="Status"
                    label="Status"
                    value={formik.values.status}
                    onChange={(event: SelectChangeEvent) => {
                      formik.setFieldValue("status", event.target.value);
                    }}
                  >
                    <MenuItem value={"Active"}>Active</MenuItem>
                    <MenuItem value={"Inactive"}>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <Button type="submit" variant="contained">
                Edit Product
              </Button>
            </Box>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
