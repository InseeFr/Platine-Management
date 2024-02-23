import {
  Chip,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { MoreAction } from "./MoreActions";
import { APISchemas } from "../../types/api";
import { CollectStateSelect, collectStates } from "./CollectStateSelect";
import { Row } from "../Row";
import { CollectStateHistory } from "./CollectStateHistory";
import { theme } from "../../theme";

interface Column {
  id: string;
  label: string;
  minWidth?: string;
  format?: (value: number) => string;
}

const style = {
  root: {
    ".MuiTablePagination-displayedRows": {
      typography: "bodySmall",
    },
    ".MuiTablePagination-input": {
      typography: "bodySmall",
    },
    ".MuiTablePagination-selectLabel": {
      typography: "bodySmall",
      color: "text.tertiary",
    },
  },
};

// TODO: use real ids (state, endDate, surveyUnit, role)
const columns: readonly Column[] = [
  { id: "state", label: "Etat de la collecte", minWidth: "330px" },
  { id: "sourceWording", label: "Nom enquête", minWidth: "95px" },
  { id: "year", label: "Millésime", minWidth: "95px" },
  { id: "period", label: "Campagne", minWidth: "120px" },
  { id: "endDate", label: "Date fin enquête", minWidth: "120px" },
  { id: "surveyUnit", label: "Unité enquêtée", minWidth: "150px" },
  { id: "identificationName", label: "Raison sociale", minWidth: "190px" },
  { id: "role", label: "Rôle", minWidth: "120px" },
  { id: "actions", label: "Actions", minWidth: "100px" },
];

type Props = {
  surveys?: APISchemas["AccreditationDetailDto"][];
};

export const ContactSurveysTable = (props: Props) => {
  const surveys = props.surveys ?? [];

  const isLoading = props.surveys === undefined;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openCollectStateHistory, setOpenCollectStateHistory] = useState(false);

  const onOpenCollectStateHistory = () => {
    setOpenCollectStateHistory(true);
  };

  const onCloseCollectStateHistory = () => {
    setOpenCollectStateHistory(false);
  };

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onSelectCollectState = (value: string) => {
    console.log(value);
    // add new state
  };

  return (
    <TableContainer>
      <Table aria-label="surveys table">
        <TableHead sx={{ backgroundColor: "#EBEFF5" }}>
          <TableRow sx={{ borderBottom: `solid 1px ${theme.palette.text.hint}` }}>
            {columns.map(column => (
              <TableCell
                key={column.id}
                style={{ minWidth: column.minWidth }}
                sx={{ typography: "titleSmall", py: 3 }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {surveys.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(survey => {
            return (
              <TableRow
                hover
                tabIndex={-1}
                key={`row-${survey.partition}`}
                sx={{ borderBottom: `solid 1px ${theme.palette.text.hint}` }}
              >
                {columns.map(column => {
                  const value = survey[column.id as keyof typeof survey];

                  if (column.id === "state") {
                    return (
                      <TableCell key={`state-${survey.partition}`}>
                        <Row spacing={1}>
                          <Chip
                            sx={{
                              typography: "titleSmall",
                              maxWidth: "300px",
                              textOverflow: "ellipsis",
                            }}
                            label={
                              // TODO add collect state here
                              collectStates.find(state => state.value === "TODO")?.label ?? "NO DATA"
                            }
                            onClick={onOpenCollectStateHistory}
                            // TODO add collect state here
                            color={getCollectStateChipColor("TODO")}
                          />
                          <CollectStateHistory
                            onClose={onCloseCollectStateHistory}
                            open={openCollectStateHistory}
                            // TODO: add questionningId in api
                            questioningId={123}
                            surveyName={survey.partition ?? ""}
                          />
                          <CollectStateSelect onSelect={onSelectCollectState} />
                        </Row>
                      </TableCell>
                    );
                  }

                  if (column.id === "actions") {
                    return (
                      <TableCell key={`action-${survey.partition}`} align="center">
                        {/* add id when id is in api */}
                        <MoreAction surveyId={survey.sourceId} surveyUnitId={"id"} />
                      </TableCell>
                    );
                  }

                  return <TableCell key={column.id}>{value ?? "NO DATA"}</TableCell>;
                })}
              </TableRow>
            );
          })}
          {isLoading && <LoadingCell columnLength={columns.length} />}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              sx={style.root}
              rowsPerPageOptions={[10, 20, 50]}
              labelRowsPerPage={"Lignes par page :"}
              labelDisplayedRows={page =>
                `${page.from}-${page.to === -1 ? page.count : page.to} sur ${
                  page.count
                } entités affichées`
              }
              count={surveys.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

const getCollectStateChipColor = (state: string) => {
  switch (state) {
    case "PND":
    case "PARTIELINT":
      return "error";
    case "VALINT":
    case "VALPAP":
      return "success";
    default:
      return "default";
  }
};

export const LoadingCell = ({ columnLength }: { columnLength: number }) => {
  return (
    <TableRow>
      <TableCell align="center" colSpan={columnLength}>
        <CircularProgress />
      </TableCell>
    </TableRow>
  );
};
