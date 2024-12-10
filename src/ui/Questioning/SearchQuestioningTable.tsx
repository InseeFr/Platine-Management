import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { Column, CustomTableFooter, TableHeader } from "../TableComponents.tsx";
import { useState } from "react";
import { SearchQuestioningTableRow } from "./SearchQuestioningTableRow.tsx";
import { theme } from "../../theme.tsx";
import { APISchemas } from "../../types/api.ts";
import { LoadingRow } from "../Contact/SearchContactTable.tsx";
import { SelectChangeEvent } from "@mui/material/Select/Select";
import { QuestioningsBaseType } from "../../hooks/useSearchFilter.ts";

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
  questionings: APISchemas["SearchQuestioningDto"][];
  stateFilter: string;
  isLoading: boolean;
  totalCount: number;
  questioningFilter: QuestioningsBaseType;
  setFilter: (name: "questionings", filter: QuestioningsBaseType) => void;
};

export const SearchQuestioningTable = ({
  questionings,
  stateFilter,
  isLoading,
  totalCount,
  questioningFilter,
  setFilter,
}: Props) => {
  const [order, setOrder] = useState<"asc" | "desc">();

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setFilter("questionings", { ...questioningFilter, page: newPage });
  };

  const onChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFilter("questionings", {
      ...questioningFilter,
      pageSize: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  const onChangeSelectedRowsPerPage = (event: SelectChangeEvent<string>) => {
    setFilter("questionings", {
      ...questioningFilter,
      pageSize: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  // TODO use it when get quality data
  // const sortedQuestioning = order
  //   ? questionings.sort((a, b) =>
  //       order === "asc" ? a.quality.localeCompare(b.quality) : b.quality.localeCompare(a.quality),
  //     )
  //   : questionings;

  return (
    <TableContainer component={Paper} elevation={2}>
      <Table aria-label="search questionings table">
        <caption style={{ display: "none" }}>
          liste des interrogations avec différentes informations (nom de la collecte, ID connexion des
          répondants, statut...)
        </caption>
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
        {isLoading && (
          <TableBody>
            <TableRow>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
              <LoadingRow />
            </TableRow>
          </TableBody>
        )}
        <TableBody>
          {questionings.map(questioning => (
            <SearchQuestioningTableRow
              key={questioning.questioningId}
              questioning={questioning}
              stateFilter={stateFilter}
            />
          ))}
        </TableBody>
        {totalCount > questioningFilter.pageSize * (questioningFilter.page + 1) && (
          <CustomTableFooter
            count={totalCount}
            rowsPerPage={questioningFilter.pageSize}
            page={questioningFilter.page}
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
