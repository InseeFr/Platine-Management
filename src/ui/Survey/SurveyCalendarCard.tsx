import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { APISchemas } from "../../types/api.ts";
import {
  Button,
  Card,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { CardtitleWithIcon } from "../CardtitleWithIcon.tsx";
import { Row } from "../Row.tsx";
import { useFetchQuery } from "../../hooks/useFetchQuery.ts";
import moment from "moment";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { useToggle } from "react-use";

type Props = {
  survey: APISchemas["SurveyDto"] | undefined;
  onSave: () => void;
};

export const SurveyCalendarCard = ({ survey, onSave }: Props) => {
  const [hasDialog, toggleDialog] = useToggle(false);

  const handleSave = () => {
    toggleDialog();
    onSave();
  };

  const { data: campPartition } = useFetchQuery("/api/surveys/{id}/campaigns-partitionings", {
    urlParams: {
      id: survey!.id!,
    },
  });

  if (!campPartition) {
    return (
      <Row justifyContent="center" py={10}>
        <CircularProgress />
      </Row>
    );
  }

  return (
    <Grid
      px={6}
      py={3}
      container
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(690px, 1fr))",
        columnGap: 4,
        rowGap: 3,
      }}
    >
      <Card sx={{ px: 6, py: 3 }} elevation={2}>
        <Stack spacing={4}>
          <CardtitleWithIcon IconComponent={CalendarMonthOutlinedIcon} title={"Dates de l'enquête"} />
          <Divider variant="fullWidth" />
          <Stack>
            <Row spacing={1}>
              <InfoOutlinedIcon />

              <Typography variant="itemSmall">
                {
                  "La date de retour attendu correspond à la date figurant sur le questionnaire, le tableau 'mes enquêtes', et les courriers."
                }
              </Typography>
            </Row>
            <Typography variant="itemSmall" sx={{ ml: 4 }}>
              {
                "La date de fermeture correspond au jour, depuis minuit, à partir duquel le répondant ne peut plus accéder au questionnaire depuis le tableau 'mes enquêtes'."
              }
            </Typography>
            <Typography variant="itemSmall" sx={{ ml: 4 }}>
              {
                "A noter : les autres dates sont présentes à titre indicatif et sont sans impact sur le déroulement de la collecte."
              }
            </Typography>
          </Stack>
          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ background: "#EBEFF5" }}>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: 700 }}>
                    Année de collecte
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700 }}>
                    Période de collecte
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700 }}>
                    Vague
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700 }}>
                    Date d'ouverture
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700 }}>
                    Date de retour attendu
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700 }}>
                    Date de fermeture
                  </TableCell>
                  <TableCell align="center">Date de relance</TableCell>
                  <TableCell align="center">Date de mise en demeure</TableCell>
                  <TableCell align="center">Date de constat de non réponse</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {campPartition
                  .sort((a, b) => (a.id! > b.id! ? 1 : -1))
                  .map(
                    p =>
                      p.partitionings
                        ?.sort((a, b) => (a.id! > b.id! ? 1 : -1))
                        .map(part => (
                          <TableRow key={part.id}>
                            <TableCell align="center" sx={{ borderBottom: "none" }}>
                              {survey?.year}
                            </TableCell>
                            <TableCell align="center">
                              {survey?.id ? p.id?.replace(survey?.id, "") : ""}
                            </TableCell>
                            <TableCell align="center">
                              {p.id ? part.id?.replace(p.id, "") : ""}
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 700 }}>
                              {moment(part.openingDate).format("DD/MM/YYYY")}
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 700 }}>
                              {moment(part.returnDate).format("DD/MM/YYYY")}
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 700 }}>
                              {moment(part.closingDate).format("DD/MM/YYYY")}
                            </TableCell>
                            <TableCell align="center">{"not provided"}</TableCell>
                            <TableCell align="center">{"not provided"}</TableCell>
                            <TableCell align="center">{"not provided"}</TableCell>
                          </TableRow>
                        )),
                  )}
              </TableBody>
            </Table>
          </TableContainer>
          <Row spacing={2} justifyContent={"right"}>
            <Button
              variant="outlined"
              sx={{ typography: "bodyLarge" }}
              size={"large"}
              startIcon={<BorderColorOutlinedIcon />}
              //  onClick={toggleDialog}
            >
              Modifier
            </Button>
            <Button
              variant="contained"
              sx={{ typography: "bodyLarge" }}
              size={"large"}
              startIcon={<AddCircleOutlineOutlinedIcon />}
              onClick={toggleDialog}
            >
              Nouvelle Vague
            </Button>
          </Row>
        </Stack>
      </Card>
    </Grid>
  );
};
