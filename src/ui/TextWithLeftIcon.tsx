import { ElementType } from "react";
import { Row } from "./Row";
import Typography from "@mui/material/Typography/Typography";

type TextWithLeftIconProps = {
  IconComponent: ElementType;
  text: string;
};

export const TextWithLeftIcon = ({ IconComponent, text }: TextWithLeftIconProps) => {
  return (
    <Row gap={2}>
      <IconComponent fontSize="small" />
      <Typography variant="titleSmall">{text}</Typography>
    </Row>
  );
};
