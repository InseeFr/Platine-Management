import { Row } from "../Row.tsx";
import { IconButton, MenuItem, Select, SelectChangeEvent, Stack, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import { BinocularIcon } from "../Icon/BinocularIcon.tsx";
import { Breadcrumbs } from "../Breadcrumbs.tsx";
import { useState } from "react";
import { APISchemas } from "../../types/api.ts";
import { useFetchQuery } from "../../hooks/useFetchQuery.ts";

type Props = {
  survey: APISchemas["SurveyDto"];
};

const breadcrumbs = [
  { href: "/", title: "Accueil" },
  { href: "/search/surveys", title: "Recherche" },
  "Fiche enquête",
];

export const SurveyHeader = ({ survey }: Props) => {
  const [year, setYear] = useState(survey.year);
  const navigate = useNavigate();

  const { data: surveys } = useFetchQuery("/api/sources/{id}/surveys", {
    urlParams: {
      id: survey.sourceId!,
    },
  });

  const surveyYears = surveys?.map(s => s.year);

  const handleChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setYear(parseInt(value));
    console.log(`/surveys/${survey.sourceId}${value}`);
    navigate(`/surveys/${survey.sourceId}${value}`);
  };

  return (
    <Stack>
      <Row bgcolor={"white"} justifyContent={"right"}>
        <Breadcrumbs items={breadcrumbs} />
      </Row>
      <Row spacing={5} px={6} py={2} bgcolor={"white"}>
        <IconButton sx={{ bgcolor: "background.default" }} onClick={() => navigate(-1)}>
          <ArrowBackIosNewIcon sx={{ color: "black.main" }} />
        </IconButton>
        <Stack spacing={1}>
          <Row spacing={2}>
            <BinocularIcon fontSize="tabTitle" />
            <Typography component={"span"} fontWeight={700} fontSize={"20px"} color={"text.primary"}>
              {"Enquête"} {survey.sourceId.toUpperCase()}
            </Typography>
          </Row>

          <Select
            value={year!.toString()}
            sx={{
              width: 120,
              height: 40,
            }}
            onChange={handleChange}
            displayEmpty
          >
            {surveyYears?.map(s => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </Row>
    </Stack>
  );
};
