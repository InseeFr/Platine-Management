import { Typography } from "@mui/material";
import { Row } from "../../Row";

type Props = {
  label: string;
  value: string | number | undefined;
};

export const SurveyMetadataItem = ({ label, value }: Props) => {
  return (
    <Row spacing={1} justifyContent={"space-between"}>
      <Typography variant="itemSmall" color="light.main">
        {label}
      </Typography>
      <Typography variant="titleSmall" textAlign={"justify"} sx={{ width: 200 }}>
        {value}
      </Typography>
    </Row>
  );
};
