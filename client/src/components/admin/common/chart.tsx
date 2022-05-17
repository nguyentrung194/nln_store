import * as React from "react";
import Paper from "@mui/material/Paper";
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
  PieSeries,
  Tooltip,
  AreaSeries,
  Legend,
  LineSeries,
} from "@devexpress/dx-react-chart-material-ui";
import {
  Palette,
  EventTracker,
} from "@devexpress/dx-react-chart";

import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { ageStructure, data5, data, data1, data2, schema } from "./data";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress color="inherit" variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export const ChartCustom1 = () => {
  return (
    <Paper>
      <Chart width={150} height={120} data={data}>
        <BarSeries valueField="population" argumentField="year" />
        <EventTracker />
        <Tooltip />
      </Chart>
    </Paper>
  );
};

export const ChartCustom2 = (props: any) => {
  return (
    <div>
      {ageStructure.map((el) => {
        return (
          <Box sx={{ width: "100%" }} className={`${el.color}`}>
            <Typography
              variant="body2"
              color="text.secondary"
            >{`${el.name}`}</Typography>
            <LinearProgressWithLabel value={el.value} />
          </Box>
        );
      })}
    </div>
  );
};

export const ChartCustom3 = () => {
  return (
    <Paper>
      <Chart height={320} data={data1}>
        <BarSeries valueField="population" argumentField="year" />
        <EventTracker />
        <Tooltip />
      </Chart>
    </Paper>
  );
};

const RootWithTitle = (props: any) => {
  // console.log(props);
  return (
    <div className="w-full">
      <Legend.Root
        {...props}
        sx={{}}
        className="grid grid-cols-2 lg:grid-cols-3 gap-2 w-full"
      />
    </div>
  );
};

const Item = (props: any) => {
  // console.log(props);
  const value = data2[schema.indexOf(props.children[0].props.color)].val;
  const total = data2.reduce(
    (previousValue, currentValue) => previousValue + currentValue.val,
    0
  );
  return (
    <div>
      <Legend.Item {...props} sx={{}} />
      <div>
        <p>Num: {value}</p>
        <p>{((value / total) * 100).toFixed(2)} %</p>
      </div>
    </div>
  );
};

const Label = (props: any) => {
  // console.log(props);
  return <Legend.Label {...props} sx={{ textAlign: "left" }} />;
};

export const ChartCustom4 = () => {
  return (
    <Paper>
      <Chart data={data2}>
        <Palette scheme={schema} />
        <EventTracker />
        <Tooltip />
        {/* <Stack /> */}
        <Legend
          position="bottom"
          labelComponent={Label}
          rootComponent={RootWithTitle}
          itemComponent={Item}
        />
        <PieSeries
          innerRadius={0.8}
          valueField="val"
          argumentField="category"
        />
      </Chart>
    </Paper>
  );
};

// console.log(generateData(2.5, 12, 0.5));

export const ChartCustom5 = () => {
  return (
    <Paper>
      <Chart data={data5}>
        <EventTracker />
        <Tooltip />
        <ArgumentAxis />
        <ValueAxis />
        <Legend position="bottom" />
        <AreaSeries
          name="Income"
          valueField="constantValue"
          argumentField="argument"
        />
        <LineSeries
          name="Expenses"
          valueField="linearValue"
          argumentField="argument"
        />
      </Chart>
    </Paper>
  );
};
