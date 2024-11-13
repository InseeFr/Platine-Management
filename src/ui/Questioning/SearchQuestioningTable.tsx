import {
  Paper,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableSortLabel,
} from "@mui/material";
import { Column, CustomTableFooter, TableHeader } from "../TableComponents.tsx";
import { useState } from "react";
import { SearchQuestioningTableRow } from "./SearchQuestioningTableRow.tsx";
import { theme } from "../../theme.tsx";

const questioningsMock = [
  {
    questioningId: 1,
    campaignId: "ARTI",
    listContactIdentifiers: ["IDEC123", "IDEC223", "IDEC323", "IDEC423"],
    surveyUnitIdentificationCode: "SIREN001",
    surveyUnitId: "BBB001",
    lastEvent: "HC",
    lastCommunication: "COURRIER_RELANCE",
    validationDate: "2024-07-19T07:23:20.156Z",
    quality: "5",
  },
  {
    questioningId: 2,
    campaignId: "ARTI",
    listContactIdentifiers: ["IDEC123"],
    surveyUnitIdentificationCode: "SIRET/ID",
    surveyUnitId: "BBB001",
    lastEvent: "REFUSAL",
    lastCommunication: "MAIL_OUVERTURE",
    validationDate: undefined,
    quality: "8",
  },
  {
    questioningId: 3,
    campaignId: "ARTI",
    listContactIdentifiers: undefined,
    surveyUnitId: "BBB001",
    lastEvent: "PARTIELINT",
    lastCommunication: "COURRIER_MED",
    validationDate: undefined,
    quality: "2",
  },
];

export const getCollectStateChipColor = (state?: string) => {
  switch (state) {
    case "REFUSAL":
      return "error";
    case "PARTIELINT":
    case "VALINT":
    case "VALPAP":
      return "success";
    default:
      return "default";
  }
};

const columns: readonly Column[] = [
  { id: "campaignId", label: "Collecte", minWidth: "95px" },
  { id: "listContactIdentifiers", label: "ID connexion", minWidth: "95px" },
  { id: "surveyUnitIdentificationCode", label: "ID métier", minWidth: "100px" },
  { id: "lastEvent", label: "Statut", minWidth: "150px" },
  { id: "lastCommunication", label: "Dernière communication", minWidth: "150px" },
  { id: "validationDate", label: "Date de collecte", minWidth: "150px" },
  { id: "actions", label: "", minWidth: "50px" },
];

const columnsWithQuality: readonly Column[] = [
  { id: "campaignId", label: "Collecte", minWidth: "95px" },
  { id: "listContactIdentifiers", label: "ID connexion", minWidth: "95px" },
  { id: "surveyUnitIdentificationCode", label: "ID métier", minWidth: "100px" },
  { id: "lastEvent", label: "Statut", minWidth: "150px" },
  { id: "lastCommunication", label: "Dernière communication", minWidth: "150px" },
  { id: "validationDate", label: "Date de collecte", minWidth: "150px" },
  { id: "quality", label: "Qualité", minWidth: "50px" },
  { id: "actions", label: "", minWidth: "50px" },
];

type Props = {
  stateFilter: string;
};

export const SearchQuestioningTable = ({ stateFilter }: Props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<"asc" | "desc">();

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const onChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onChangeSelectedRowsPerPage = (event: SelectChangeEvent<string>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedQuestioning = order
    ? questioningsMock.sort((a, b) =>
        order === "asc" ? a.quality.localeCompare(b.quality) : b.quality.localeCompare(a.quality),
      )
    : questioningsMock;

  return (
    <TableContainer component={Paper} elevation={2}>
      <Table aria-label="search questionings table">
        {stateFilter === "recovery" ? (
          <TableHead sx={{ backgroundColor: "#EBEFF5" }}>
            {columnsWithQuality.map(column => (
              <TableCell
                key={column.id}
                style={{ minWidth: column.minWidth }}
                sx={{
                  typography: "titleSmall",
                  py: 2,
                  "&:focus": {
                    outline: `1px solid ${theme.palette.common.black} !important`,
                    outlineOffset: "-1px",
                  },
                }}
                align={column.align ?? "left"}
                sortDirection={column.id === "quality" ? order : false}
              >
                {column.id === "quality" ? (
                  <TableSortLabel
                    active
                    direction={order}
                    onClick={() => (order === "asc" ? setOrder("desc") : setOrder("asc"))}
                  >
                    {column.label}
                  </TableSortLabel>
                ) : (
                  <>{column.label} </>
                )}
              </TableCell>
            ))}
          </TableHead>
        ) : (
          <TableHeader columns={columns} />
        )}
        <TableBody>
          {sortedQuestioning
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(questioning => (
              <SearchQuestioningTableRow
                key={questioning.questioningId}
                questioning={questioning}
                stateFilter={stateFilter}
              />
            ))}
        </TableBody>
        {sortedQuestioning.length > rowsPerPage && (
          <CustomTableFooter
            count={sortedQuestioning.length}
            rowsPerPage={rowsPerPage}
            page={page}
            labelDisplayedRows="interrogations affichées"
            onChangePage={handleChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            onChangeSelectedRowsPerPage={onChangeSelectedRowsPerPage}
          />
        )}
      </Table>
    </TableContainer>
  );
};
