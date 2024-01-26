import { ElementType } from "react";
import { Row } from "../Row";
import { Typography } from "@mui/material";

type Props = {
  IconComponent: ElementType;
  title: string;
};

export const ContactDetailsCardTitle = ({ IconComponent, title }: Props) => {
  return (
    <Row spacing={2}>
      <IconComponent fontSize="small" />
      <Typography variant="titleMedium" fontSize={"20px"} fontWeight={700}>
        {title}
      </Typography>
    </Row>
  );
};
