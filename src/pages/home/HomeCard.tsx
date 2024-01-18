import { Box, Card, CardActionArea, Typography } from "@mui/material";
import { type ElementType, FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Row } from "../../ui/Row.tsx";

interface Props {
  IconComponent: ElementType;
  content: string;
  color: string;
  to: { pathname: string; tab: number };
}

export const HomeCard: FunctionComponent<Props> = ({ IconComponent, content, color, to }) => {
  return (
    <Card elevation={2} variant="home">
      <CardActionArea component={Link} to={to}>
        <Row bgcolor={color} py={3} color="white" justifyContent="center">
          <IconComponent fontSize="cardMedia" />
        </Row>
        <Box pt={2} px={2} pb={1.25} color="black.main" textAlign="center" lineHeight={1.125}>
          {content}
        </Box>
      </CardActionArea>
    </Card>
  );
};
