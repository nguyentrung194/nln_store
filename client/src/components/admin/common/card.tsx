import * as React from "react";
import { Box, Tab, Card, CardContent, Typography, Avatar } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import {
  ChartCustom1,
  ChartCustom2,
  ChartCustom3,
  ChartCustom4,
  ChartCustom5,
} from "./chart";
import { BasicSelect } from "./common";
import { stringAvatar } from "../../../common/lib";
import { MenuAccount } from "./menu";

export const Card1 = (props: any) => {
  return (
    <Card sx={{ minWidth: 0, height: "100%" }}>
      <CardContent>
        {/*  */}
        <Typography variant="h6" component="div">
          {props.title ? props.title : "Word of the Day"}
        </Typography>
        <Typography variant="h5" component="div">
          {props.num ? props.num.toLocaleString() : "Num"}
        </Typography>
        <div className="flex justify-between items-center">
          <div>
            <Typography
              sx={{ fontSize: 14, margin: "8px 0 0 0" }}
              color="text.secondary"
              gutterBottom
            >
              THIS MONTH
            </Typography>
            <Typography component="div">
              {props.this_month ? props.this_month.toLocaleString() : "Num"}
            </Typography>
            <Typography
              sx={{ fontSize: 14, margin: "8px 0 0 0" }}
              color="text.secondary"
              gutterBottom
            >
              THIS WEEK
            </Typography>
            <Typography component="div">
              {props.this_week ? props.this_week.toLocaleString() : "Num"}
            </Typography>
          </div>
          <div>
            <ChartCustom1 />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const Card2 = (props: any) => {
  return (
    <Card sx={{ minWidth: 0, height: "100%" }}>
      <CardContent>
        <div className="flex justify-between">
          <div>
            <Typography variant="h6" component="div">
              Top Products
            </Typography>
            <Typography component="div">
              In last 30 days top selected package.
            </Typography>
          </div>
          <BasicSelect />
        </div>
        <div className="py-4">
          <ChartCustom2 />
        </div>
      </CardContent>
    </Card>
  );
};

export const Card3 = (props: any) => {
  return (
    <Card sx={{ minWidth: 0, height: "100%" }}>
      <CardContent>
        <div>
          <Typography variant="h6" component="div">
            Sales Revenue
          </Typography>
          <Typography component="div">
            In last 30 days revenue from sales.
          </Typography>
        </div>
        <div className="py-4 flex justify-between">
          {[
            { up: true, percent: 4.63, name: "Monthly", salesRevenue: 9.28 },
            { up: false, percent: 1.92, name: "Weekly", salesRevenue: 2.69 },
            {
              up: true,
              percent: 3.45,
              name: "Daily (Avg)",
              salesRevenue: 0.94,
            },
          ].map((el) => {
            return (
              <div>
                <Typography
                  sx={{ fontSize: 14, margin: "8px 0 0 0" }}
                  color="text.secondary"
                  gutterBottom
                >
                  {el.name}
                </Typography>
                <Typography sx={{ fontWeight: 600 }} component="div">
                  {el.salesRevenue}K
                </Typography>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: `${el.up ? "#03a9f4" : "#f44336"}`,
                  }}
                  component="div"
                >
                  {el.up ? (
                    <ArrowUpwardIcon sx={{ fontSize: 13 }} />
                  ) : (
                    <ArrowDownwardIcon sx={{ fontSize: 13 }} />
                  )}{" "}
                  <span>{el.percent}%</span>
                </Typography>
              </div>
            );
          })}
        </div>
        <div>
          <ChartCustom3 />
        </div>
      </CardContent>
    </Card>
  );
};

export const Card4 = (props: any) => {
  return (
    <Card sx={{ minWidth: 0, height: "100%" }}>
      <CardContent>
        <div className="flex justify-between">
          <Typography variant="h6" component="div">
            Product Order Chart
          </Typography>
          <BasicSelect />
        </div>
        <div>
          <ChartCustom4 />
        </div>
      </CardContent>
    </Card>
  );
};

export const Card5 = (props: any) => {
  const [value, setValue] = React.useState("2");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Card sx={{ minWidth: 0, height: "100%" }}>
      <CardContent>
        <div className="flex justify-between">
          <div>
            <Typography variant="h6" component="div">
              Income vs Expenses
            </Typography>
            <Typography
              sx={{ fontSize: 14, margin: "8px 0 0 0" }}
              color="text.secondary"
              gutterBottom
            >
              How was your income and Expenses this month.
            </Typography>
          </div>
          <div>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChange} aria-label="API tabs">
                  <Tab label="7 D" value="1" />
                  <Tab label="1 M" value="2" />
                  <Tab label="3 M" value="3" />
                </TabList>
              </Box>
            </TabContext>
          </div>
        </div>
        <div className="py-4 flex justify-between w-1/3 space-x-2">
          {[
            {
              up: false,
              benefit: true,
              percent: 4.63,
              name: "Income",
              salesRevenue: 9.28,
            },
            {
              up: false,
              benefit: false,
              percent: 1.92,
              name: "Expenses",
              salesRevenue: 2.69,
            },
          ].map((el) => {
            return (
              <div>
                <Typography
                  sx={{ fontSize: 14, margin: "8px 0 0 0" }}
                  color="text.secondary"
                  gutterBottom
                >
                  {el.name}
                </Typography>
                <Typography sx={{ fontWeight: 600 }} component="div">
                  {el.salesRevenue}K
                </Typography>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: `${
                      (el.benefit ? el.up : !el.up) ? "#03a9f4" : "#f44336"
                    }`,
                  }}
                  component="div"
                >
                  {el.up ? (
                    <ArrowUpwardIcon sx={{ fontSize: 13 }} />
                  ) : (
                    <ArrowDownwardIcon sx={{ fontSize: 13 }} />
                  )}{" "}
                  <span>{el.percent}%</span>
                </Typography>
              </div>
            );
          })}
        </div>
        <div>
          <ChartCustom5 />
        </div>
      </CardContent>
    </Card>
  );
};

export const Card6 = (props: any) => {
  return (
    <Card sx={{ minWidth: 0, height: "100%" }}>
      <CardContent>
        <div className="flex justify-between items-center border border-t-0 border-r-0 border-l-0">
          <Typography variant="h6" component="div">
            New Customer
          </Typography>
          <div>View All</div>
        </div>
        {[1, 2, 3, 4].map((el) => {
          return (
            <div className="flex space-y-1 space-x-4 justify-between items-center border border-t-0 border-r-0 border-l-0">
              <div className="flex items-center space-y-1 space-x-4">
                <div>
                  <Avatar
                    className="my-4"
                    {...stringAvatar(
                      { name: "A A", url: "" },
                      {
                        width: 40,
                        height: 40,
                      }
                    )}
                    variant="circular"
                  />
                </div>
                <div>
                  <Typography
                    sx={{ fontSize: 16, fontWeight: 700, margin: "8px 0 0 0" }}
                    color=""
                    gutterBottom
                  >
                    Abu Bin Ishtiyak
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14, margin: "8px 0 0 0" }}
                    color="text.secondary"
                    gutterBottom
                  >
                    info@softnio.com
                  </Typography>
                </div>
              </div>
              <MenuAccount
                options={["Account settings", "Push notification"]}
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export const Card7 = (props: any) => {
  return (
    <Card sx={{ minWidth: 0, height: "100%" }}>
      <CardContent>
        <div className="flex items-center justify-between border border-t-0 border-r-0 border-l-0">
          <Typography variant="h6" component="div">
            Recent Activities
          </Typography>
          <div>All</div>
        </div>
        {[1, 2, 3, 4].map((el) => {
          return (
            <div className="flex space-y-1 space-x-4 justify-between items-center border border-t-0 border-r-0 border-l-0">
              <div className="flex space-y-1 space-x-4">
                <div>
                  <Avatar
                    className="my-4"
                    {...stringAvatar(
                      { name: "Jony", url: "" },
                      {
                        width: 40,
                        height: 40,
                      }
                    )}
                    variant="circular"
                  />
                </div>
                <div>
                  <Typography
                    sx={{ fontSize: 14, fontWeight: 700, margin: "8px 0 0 0" }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Keith Jensen requested for product.
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14, margin: "8px 0 0 0" }}
                    color="text.secondary"
                    gutterBottom
                  >
                    2 hours ago
                  </Typography>
                </div>
              </div>
              <MenuAccount
                options={["Account settings", "Push notification"]}
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
