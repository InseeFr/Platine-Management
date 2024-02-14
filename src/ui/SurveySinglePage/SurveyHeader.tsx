import { Row } from "../Row.tsx";
import { IconButton, MenuItem, Select, SelectChangeEvent, Stack, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import { BinocularIcon } from "../Icon/BinocularIcon.tsx";
import { Breadcrumbs } from "../Breadcrumbs.tsx";
import { useState } from "react";
import { APISchemas } from "../../types/api.ts";

type Props = {
  survey: APISchemas["SurveyDto"];
};

const breadcrumbs = [
  { href: "/", title: "Accueil" },
  { href: "/recherche", title: "Recherche" },
  "Fiche enquête",
];

export const SurveyHeader = ({ survey }: Props) => {
  const [year, setYear] = useState(survey.year);
  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent) => {
    setYear(event.target.value);

    console.log(year);
  };

  return (
    <Stack>
      <Breadcrumbs items={breadcrumbs} />
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
            {surveyYears.map(s => (
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
