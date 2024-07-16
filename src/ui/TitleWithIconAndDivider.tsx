import { ElementType } from "react";
import { Row } from "./Row.tsx";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

type Props = {
  title: string;
  IconComponent: ElementType;
};

export const TitleWithIconAndDivider = ({ IconComponent, title }: Props) => {
  return (
    <Stack spacing={2} pb={3}>
      <Row spacing={2}>
        <IconComponent fontSize="cardTitle" />
        <Typography variant="titleSmall" fontSize={"18px"}>
          {title}
        </Typography>
      </Row>
      <Divider variant="fullWidth" sx={{ borderColor: "black.main" }} />
    </Stack>
  );
};
