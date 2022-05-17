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
  CardMedia,
} from "@mui/material";
import * as React from "react";
import { useFormik } from "formik";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import environment from "../../../config";
import { useParams } from "react-router-dom";
import { storage } from "../../../hooks/use-firebase";

export const EditCategory = () => {
  const { addToast } = useToasts();
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchData(id: string) {
      // You can await here
      await axios({
        url: `${environment.api}categories/${id}`,
        method: "GET",
        // withCredentials: true,
      })
        .then(
          ({
            data: { data },
          }: {
            data: {
              data: React.SetStateAction<{
                name: string;
                image: string;
                status: string;
              }>;
            };
          }) => {
            // Handle success
            formik.setValues(data);
            console.log(data);
          }
        )
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

  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
      status: "",
    },
    onSubmit: async (values) => {
      try {
        formik.setSubmitting(true);
        // code there
        axios({
          url: `${environment.api}categories/${id}`,
          method: "PUT",
          data: {
            name: values.name,
            image: values.image,
            status: values.status,
          },
        })
          .then(({ data }) => {
            console.log(data);
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
            Edit Category with id: {id}
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
              <div className="col-span-1 row-span-2 flex items-start flex-col">
                <CardMedia
                  component="img"
                  height="100"
                  sx={{ maxWidth: 100 }}
                  image={`${formik.values.image}`}
                  alt="green iguana"
                />
                <div className="flex items-center">
                  <label className="h-full cursor-pointer border px-3 py-1.5 flex items-center justify-center w-full text-center hover:bg-slate-100 rou custom-file-upload">
                    <input
                      aria-label="File browser"
                      className="hidden"
                      name="image"
                      type="file"
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
                            formik.setFieldValue("image", result[0].assetUrl);
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
              <div className="col-span-3 flex items-center">
                <Button type="submit" variant="contained">
                  Edit Category
                </Button>
              </div>
            </Box>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
