import { Card, CardContent, CardMedia, CardActionArea, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface Props {
  Icon: React.ElementType;
  cardText: string;
}

export const HomeCard: FunctionComponent<Props> = ({ Icon, cardText }) => {
  return (
    <>
      <Card
        sx={{
          borderRadius: "16px",
          boxShadow: 4,
          background: "transparent",
          borderColor: "white",
          width: 164,
          height: 179,
        }}
        variant="outlined"
      >
        <CardActionArea>
          <CardMedia sx={{ px: 4, py: 3 }}>
            {Icon && (
              <Icon
                style={{ background: "transparent" }}
                sx={{ px: 2.5, fontSize: 60, backgroundColor: "transparent", color: "white" }}
              />
            )}
          </CardMedia>
          <CardContent sx={{ pt: 1, px: 2, background: "white" }}>
            <Typography color="primary" fontSize={16} fontWeight={600} textAlign="center">
              {cardText}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};
