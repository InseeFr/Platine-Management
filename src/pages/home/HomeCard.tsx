import { Card, CardContent, CardMedia, CardActionArea, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface Props {
  IconComponent: React.ElementType;
  content: string;
  color: string;
  to: { pathname: string; value: number };
}

export const HomeCard: FunctionComponent<Props> = ({ IconComponent, content, color, to }) => {
  return (
    <>
      <Card
        sx={{
          borderRadius: "16px",
          boxShadow: 4,
          borderColor: "white",
          width: 164,
          height: 179,
          background: color,
        }}
        variant="outlined"
      >
        <CardActionArea component={Link} to={to}>
          <CardMedia sx={{ px: 4, py: 3 }}>
            {IconComponent && <IconComponent sx={{ px: 2.5, fontSize: 60, color: "white" }} />}
          </CardMedia>
          <CardContent sx={{ pt: 1, px: 2, background: "white" }}>
            <Typography color="primary" fontSize={16} fontWeight={600} textAlign="center">
              {content}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};
