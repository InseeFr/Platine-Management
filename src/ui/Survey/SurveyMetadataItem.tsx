import { Typography } from "@mui/material";
import { PropsWithChildren } from "react";
import Grid from "@mui/material/Grid";

type Props = {
  label: string;
  value: string | number | undefined;
};

export const SurveyMetadataItems = ({ children }: PropsWithChildren) => {
  return (
    <Grid sx={{ display: "grid", gridTemplateColumns: "max-content 1fr", rowGap: 1, columnGap: 3 }}>
      {children}
    </Grid>
  );
};

export const SurveyMetadataItem = ({ label, value }: Props) => {
  return (
    <>
      <Typography sx={{ minWidth: 100 }} variant="itemSmall" color="light.main">
        {label}
      </Typography>
      <Typography variant="titleSmall" textAlign={"justify"} sx={{ width: 200 }}>
        {value}
      </Typography>
    </>
  );
};
