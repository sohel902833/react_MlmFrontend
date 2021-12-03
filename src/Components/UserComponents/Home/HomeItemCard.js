import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./home.css";
function HomeItemCard({ text, image }) {
  return (
    <Card>
      <CardContent>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography className="title" variant="h6">
            {text}
          </Typography>
          <img src={image} alt="" />
        </div>
      </CardContent>
    </Card>
  );
}

export default HomeItemCard;
