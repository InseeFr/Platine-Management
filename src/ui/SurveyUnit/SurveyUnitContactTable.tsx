import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { Column, TableHeader } from "../TableComponents.tsx";
import { APISchemas } from "../../types/api.ts";
import TableCell from "@mui/material/TableCell";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Paper, TableRow } from "@mui/material";
import { Link } from "../Link.tsx";
import { LoadingRow, style } from "../Contact/SearchContactTable.tsx";

const columns: readonly Column[] = [
  { id: "identifier", label: "ID", minWidth: "95px" },
  { id: "name", label: "Prénom/Nom", minWidth: "95px" },
  { id: "city", label: "Ville", minWidth: "95px" },
  { id: "phone", label: "Téléphone", minWidth: "95px" },
  { id: "email", label: "Email", minWidth: "95px" },
  { id: "functionName", label: "Fonction", minWidth: "95px" },
  { id: "actions", label: "", minWidth: "50px" },
];

type Props = {
  contacts?: APISchemas["SurveyUnitContact"][];
  isLoading: boolean;
};

export const SurveyUnitContactTable = (props: Props) => {
  const contacts = props.contacts ?? [];

  return (
    <TableContainer component={Paper} elevation={2}>
      <Table aria-label="survey unit contacts table">
        <TableHeader columns={columns} />
        <TableBody>
          {props.isLoading && (
            <>
              <TableRow>
                <LoadingRow />
              </TableRow>
              <TableRow>
                <LoadingRow />
              </TableRow>
              <TableRow>
                <LoadingRow />
              </TableRow>
            </>
          )}
          {contacts.map(contact => {
            return (
              <TableRow
                key={contact.identifier}
                sx={style.root}
                hover
                component={Link}
                to={`/contacts/${contact.identifier}`}
              >
                <TableCell>{`#${contact.identifier}`}</TableCell>
                <TableCell>{`${contact.firstName} ${contact.lastName}`}</TableCell>
                <TableCell>{contact.city && contact.city !== "" ? contact.city : "/"}</TableCell>
                <TableCell>
                  {contact.phoneNumber && contact.phoneNumber !== "" ? contact.phoneNumber : "/"}
                </TableCell>
                <TableCell>{contact.email && contact.email !== "" ? contact.email : "/"}</TableCell>
                <TableCell>TODO DATA</TableCell>
                <TableCell align="right">
                  <ChevronRightIcon fontSize="navigateIcon" color="primary" />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
