import * as React from "react";
import { CardCustomer } from "./card";
import { MenuCustomHead } from "../common/menu";
import { Typography, Button } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import environment from "../../../config";
import axios from "axios";

export const Customer = () => {
  const [users, setUsers] = React.useState<any[]>([]);
  React.useEffect(() => {
    async function fetchData() {
      // You can await here
      await axios({
        url: `${environment.api}users`,
        method: "GET",
        // withCredentials: true,
      })
        .then(({ data: { data: users } }: { data: { data: any[] } }) => {
          // Handle success
          setUsers(
            users.map((value) => {
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
            Customer List
          </h3>
          <Typography
            sx={{ fontSize: 14, margin: "8px 0 0 0" }}
            color="text.secondary"
            gutterBottom
          >
            All customer.
          </Typography>
        </div>
        <div className="flex space-x-2">
          <Button variant="outlined">
            <span className="flex justify-between items-center">
              <CloudDownloadIcon fontSize="medium" color="primary" />
              <span className="pl-3">Export customers</span>
            </span>
          </Button>
          <MenuCustomHead
            options={[
              {
                key: "1",
                text: "Add customers",
                path: "/admin/customers/add-customer",
              },
              {
                key: "2",
                text: "Import customer",
                path: "/admin/customers/import-customer",
              },
            ]}
          />
        </div>
      </div>
      <div className="p-6">
        <CardCustomer values={users} />
      </div>
    </div>
  );
};
