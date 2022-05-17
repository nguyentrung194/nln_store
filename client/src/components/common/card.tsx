import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

export const ActionAreaCard = ({ image }: { image: string }) => {
  return (
    <div
      className="flex justify-center items-center"
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={`${image}`}
            alt="green iguana"
          />
        </CardActionArea>
      </Card>
    </div>
  );
};
