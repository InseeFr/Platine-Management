import { ElementType } from "react";
import { Row } from "../Row.tsx";
import { Stack, Typography } from "@mui/material";

type HeaderInformationsType = {
  IconComponent: ElementType;
  label: string;
  identifier?: string;
};

export const HeaderInformations = ({ IconComponent, label, identifier }: HeaderInformationsType) => {
  return (
    <Row spacing={2}>
      <IconComponent fontSize="headerSinglePage" />
      <Stack>
        <Typography component={"span"} fontWeight={700} fontSize={"20px"} color={"text.primary"}>
          {label}
        </Typography>
        <Typography component={"span"} fontSize={"20px"} fontWeight={600} color={"text.tertiary"}>
          {identifier}
        </Typography>
      </Stack>
    </Row>
  );
};
