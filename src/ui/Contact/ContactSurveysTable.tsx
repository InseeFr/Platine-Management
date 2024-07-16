import { Table, TableBody, TableContainer } from "@mui/material";
import { useState } from "react";
import { APISchemas } from "../../types/api.ts";
import { ContactSurveysTableRow } from "./ContactSurveysTableRow.tsx";
import {
  Column,
  CustomTableFooter,
  LoadingCell,
  NoResultCell,
  TableHeader,
} from "../TableComponents.tsx";

export const columns: readonly Column[] = [
  { id: "lastEvent", label: "Etat de la collecte", minWidth: "240px" },
  { id: "sourceWording", label: "Nom enquête", minWidth: "95px" },
  { id: "year", label: "Millésime", minWidth: "95px" },
  { id: "period", label: "Campagne", minWidth: "100px" },
  { id: "partioningClosingDate", label: "Date fin enquête", minWidth: "100px" },
  { id: "surveyUnitId", label: "Unité enquêtée", minWidth: "140px" },
  { id: "identificationName", label: "Raison sociale", minWidth: "130px" },
  { id: "main", label: "Rôle", minWidth: "100px" },
  { id: "actions", label: "Accès au site miroir", minWidth: "90px", align: "center" },
];

type Props = {
  surveys?: APISchemas["AccreditationDetailDto"][];
  refetchState: () => void;
  isLoading: boolean;
};

export const ContactSurveysTable = (props: Props) => {
  const surveys = props.surveys ?? [];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer>
      <Table aria-label="surveys table">
        <TableHeader columns={columns} />
        <TableBody>
          {surveys.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((survey, index) => {
            return (
              <ContactSurveysTableRow
                survey={survey}
                key={`survey-${survey.partition}-${survey.identificationName}-${index}`}
                refetchState={props.refetchState}
              />
            );
          })}
          {props.isLoading && <LoadingCell columnLength={columns.length} />}
          {!props.isLoading && surveys.length === 0 && (
            <NoResultCell columnLength={columns.length} text={"Aucun résultat"} />
          )}
        </TableBody>
        <CustomTableFooter
          count={surveys.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Table>
    </TableContainer>
  );
};
