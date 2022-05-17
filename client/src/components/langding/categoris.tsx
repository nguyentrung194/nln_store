import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryURL } from "../../hooks/use-query-url";
import environment from "../../config";
import axios from "axios";

export const CustomAccordion = (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = useQueryURL();

  const handleClick = (el: any) => {
    if (el.name !== "All") {
      query.set("search", el.name ? el.name : "");
      navigate(`${location.pathname}?${query}`);
    } else {
      query.delete("search");
      navigate(`${location.pathname}`);
    }
  };

  return (
    <>
      <div
        className={`w-full ${
          query.get("search") === props.name ||
          (!query.get("search") && props.name === "All")
            ? " text-green-500 "
            : ""
        }`}
      >
        <MenuItem
          onClick={() => {
            handleClick(props);
          }}
        >
          {props.name}
        </MenuItem>
      </div>
    </>
  );
};

export const Categories = () => {
  const [categories, setCategories] = React.useState([]);
  React.useEffect(() => {
    async function fetchData() {
      // You can await here
      await axios({
        url: `${environment.api}categories`,
        method: "GET",
        // withCredentials: true,
      })
        .then(({ data: { data } }) => {
          // Handle success
          setCategories(data);
        })
        .catch((err) => {
          console.log(err);
          // Handle error
          console.log(err);
        });
    }
    fetchData();
  }, []);
  const clientHeight = document.getElementById("nav-thanh")?.clientHeight || 80;
  const height = window.innerHeight;
  const [noTab, setNoTab] = React.useState(-1);
  return (
    <div
      className="w-full space-y-4 pt-3 pb-20 shadow-xl bg-white overflow-y-scroll scrollbar-custom"
      style={{
        height: height - clientHeight,
      }}
    >
      <CustomAccordion name="All" function={{ noTab, setNoTab, index: -1 }} />
      {categories.map((el: any, index: number) => {
        return (
          <CustomAccordion {...el} function={{ noTab, setNoTab, index }} />
        );
      })}
    </div>
  );
};
