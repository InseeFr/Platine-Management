import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { Column, TableHeader } from "../TableComponents.tsx";
import { APISchemas } from "../../types/api.ts";
import TableCell from "@mui/material/TableCell";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TableRow } from "@mui/material";
import { Link } from "../Link.tsx";
import { LoadingTable, style } from "../Contact/SearchContactTable.tsx";

const columns: readonly Column[] = [
  { id: "identificationCode", label: "ID métier", minWidth: "95px" },
  { id: "idSu", label: "ID technique", minWidth: "95px" },
  { id: "identificationName", label: "Raison sociale", minWidth: "140px" },
  { id: "actions", label: "", minWidth: "50px" },
];

type Props = {
  surveyUnits?: APISchemas["SurveyUnitDto"][];
  isLoading: boolean;
  onVisible: () => void;
  hasNextPage: boolean;
};

export const SearchSurveyUnitTable = (props: Props) => {
  const surveyUnits = props.surveyUnits ?? [];

  return (
    <TableContainer sx={{ py: 3 }}>
      <Table aria-label="search survey units table" size="small">
        <TableHeader columns={columns} />
        {props.isLoading && <LoadingTable onVisible={props.onVisible} />}
        <TableBody>
          {surveyUnits.map(surveyUnit => {
            return (
              <TableRow
                key={surveyUnit.idSu}
                sx={style.root}
                hover
                component={Link}
                to={`/survey-units/${surveyUnit.idSu}`}
              >
                <TableCell>{surveyUnit.identificationCode}</TableCell>
                <TableCell>{surveyUnit.idSu}</TableCell>
                <TableCell>{surveyUnit.identificationName}</TableCell>
                <TableCell align="right">
                  <ChevronRightIcon fontSize="navigateIcon" color="primary" />
                </TableCell>
              </TableRow>
            );
          })}
          {props.hasNextPage && <LoadingTable onVisible={props.onVisible} />}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
