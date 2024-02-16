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
      <IconComponent fontSize="small" />
      <Typography variant="titleMedium" fontSize={"20px"} fontWeight={700}>
        {title}
      </Typography>
    </Row>
  );
};
