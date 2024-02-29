import {
  Chip,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
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
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Column, TableHeader } from "./AssociateSurveysTable";
import { useToggle } from "react-use";

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

const columns: readonly Column[] = [
  { id: "lastEvent", label: "Etat de la collecte", minWidth: "330px" },
  { id: "sourceWording", label: "Nom enquête", minWidth: "95px" },
  { id: "year", label: "Millésime", minWidth: "95px" },
  { id: "period", label: "Campagne", minWidth: "120px" },
  { id: "partioningClosingDate", label: "Date fin enquête", minWidth: "120px" },
  { id: "surveyUnitId", label: "Unité enquêtée", minWidth: "150px" },
  { id: "identificationName", label: "Raison sociale", minWidth: "190px" },
  { id: "main", label: "Rôle", minWidth: "120px" },
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
  const [openCollectStateHistory, toggle] = useToggle(false);

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
        <TableHeader columns={columns} />
        <TableBody>
          {surveys.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(survey => {
            return (
              <TableRow
                hover
                tabIndex={-1}
                key={`row-${survey.partition}-${survey.identificationName}`}
                sx={{ borderBottom: `solid 1px ${theme.palette.text.hint}` }}
              >
                {columns.map(column => {
                  const value = survey[column.id as keyof typeof survey];

                  if (column.id === "lastEvent") {
                    return (
                      <TableCell key={`state-${survey.partition}-${survey.identificationName}`}>
                        <Row spacing={1}>
                          <Chip
                            sx={{
                              typography: "titleSmall",
                              maxWidth: "300px",
                              textOverflow: "ellipsis",
                            }}
                            label={collectStates.find(state => state.value === value)?.label}
                            onClick={toggle}
                            color={getCollectStateChipColor(value as string)}
                            onDelete={toggle}
                            deleteIcon={<ArrowDropDownIcon />}
                          />
                          {survey.questioningId && (
                            <CollectStateHistory
                              onClose={toggle}
                              open={openCollectStateHistory}
                              questioningId={survey.questioningId}
                              surveyName={survey.partition ?? ""}
                            />
                          )}
                          <CollectStateSelect onSelect={onSelectCollectState} />
                        </Row>
                      </TableCell>
                    );
                  }

                  if (column.id === "actions") {
                    return (
                      <TableCell
                        key={`action-${survey.partition}-${survey.identificationName}`}
                        align="center"
                      >
                        {/* add id when id is in api */}
                        <MoreAction surveyId={survey.sourceId} surveyUnitId={survey.surveyUnitId} />
                      </TableCell>
                    );
                  }

                  if (column.id === "main") {
                    return (
                      <TableCell key={column.id}>
                        {value === true ? "Principal" : "Secondaire"}
                      </TableCell>
                    );
                  }

                  if (column.id === "partioningClosingDate") {
                    return (
                      <TableCell key={column.id}>
                        {new Date(Date.parse(value as string)).toLocaleDateString()}
                      </TableCell>
                    );
                  }

                  return <TableCell key={column.id}>{value}</TableCell>;
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

const getCollectStateChipColor = (state?: string) => {
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
