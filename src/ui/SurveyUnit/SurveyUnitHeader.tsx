import { Row } from "../Row.tsx";
import { APISchemas } from "../../types/api.ts";
import { IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";

type Props = {
  surveyUnit: Pick<APISchemas["SurveyUnitDto"], "identificationName" | "idSu">;
};

export const SurveyUnitHeader = ({ surveyUnit }: Props) => {
  const navigate = useNavigate();
  return (
    <Row spacing={5} px={6} py={2} bgcolor={"white"}>
      <IconButton sx={{ bgcolor: "background.default" }} onClick={() => navigate(-1)}>
        <ArrowBackIosNewIcon sx={{ color: "black.main" }} />
      </IconButton>
      <Row spacing={2}>
        <CorporateFareIcon fontSize="headerSinglePage" />
        <Stack>
          <Typography component={"span"} fontWeight={700} fontSize={"20px"} color={"text.primary"}>
            {surveyUnit.identificationName}
          </Typography>
          <Typography component={"span"} fontSize={"20px"} fontWeight={600} color={"text.tertiary"}>
            {surveyUnit.idSu}
          </Typography>
        </Stack>
      </Row>
    </Row>
  );
};
