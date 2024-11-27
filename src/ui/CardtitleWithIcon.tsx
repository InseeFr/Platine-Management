import { ElementType } from "react";
import { Row } from "./Row.tsx";
import { Typography } from "@mui/material";

type Props = {
  IconComponent: ElementType;
  title: string;
};

export const CardtitleWithIcon = ({ IconComponent, title }: Props) => {
  return (
    <Row spacing={2}>
      <IconComponent alt="" />
      <Typography variant="headlineSmall" component="h2">
        {title}
      </Typography>
    </Row>
  );
};
