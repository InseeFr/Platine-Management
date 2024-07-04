import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { useState } from "react";
import {
  Column,
  CustomTableFooter,
  LoadingCell,
  StyledTableRow,
  TableHeader,
} from "../../ui/TableComponents";
import { APISchemas } from "../../types/api";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const columns: readonly Column[] = [
  { id: "identifier", label: "ID", minWidth: "140px" },
  { id: "name", label: "Prénom/Nom", minWidth: "95px" },
  { id: "email", label: "Email", minWidth: "95px" },
  { id: "actions", label: "", minWidth: "50px" },
];

type Props = {
  contacts?: APISchemas["SearchContactDto"][];
  isLoading: boolean;
};

export const SearchContactTable = (props: Props) => {
  const navigate = useNavigate();

  const contacts = props.contacts ?? [];

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
    <TableContainer sx={{ py: 3 }}>
      <Table aria-label="search contacts table" size="small">
        <TableHeader columns={columns} />
        <TableBody>
          {contacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(contact => {
            return (
              <StyledTableRow key={contact.identifier}>
                <TableCell>{`#${contact.identifier}`}</TableCell>
                <TableCell>{`${contact.firstName} ${contact.lastName}`}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="supprimer"
                    color="primary"
                    onClick={() => {
                      navigate(`/contacts/${contact.identifier}`);
                    }}
                  >
                    <ChevronRightIcon fontSize="navigateIcon" />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
            );
          })}
          {props.isLoading && <LoadingCell columnLength={columns.length} />}
          {!props.isLoading && contacts.length === 0 && <NoResultCell columnLength={columns.length} />}
        </TableBody>
        <CustomTableFooter
          count={contacts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Table>
    </TableContainer>
  );
};

const NoResultCell = ({ columnLength }: { columnLength: number }) => {
  return (
    <TableRow>
      <TableCell align="center" colSpan={columnLength}>
        <Typography variant="titleSmall">Aucun contact ne correspond à vos critères</Typography>
      </TableCell>
    </TableRow>
  );
};
