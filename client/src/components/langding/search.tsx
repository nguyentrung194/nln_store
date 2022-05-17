import { useFormik } from "formik";
import { TextField } from "@mui/material";

export const Search = () => {
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: async (values) => {
      try {
        formik.setSubmitting(true);

        // code there
        alert("call search");
        formik.setSubmitting(false);
      } catch (error) {
        // code there

        console.log(error);
        formik.setSubmitting(false);
      }
    },
  });
  return (
    <div>
      <div className="">
        <form className="" onSubmit={formik.handleSubmit}>
          <div className="">
            <div>
              <TextField
                id="filled-basic"
                variant="standard"
                label="Search"
                className="w-full"
                type="text"
                name="search"
                autoComplete="off"
                value={formik.values.search}
                onChange={formik.handleChange}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
