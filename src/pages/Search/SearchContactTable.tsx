import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { Column, StyledTableRow, TableHeader } from "../../ui/TableComponents";
import { APISchemas } from "../../types/api";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { useEffect, useRef } from "react";
import { useIntersection } from "react-use";

const columns: readonly Column[] = [
  { id: "identifier", label: "ID", minWidth: "140px" },
  { id: "name", label: "Prénom/Nom", minWidth: "95px" },
  { id: "email", label: "Email", minWidth: "95px" },
  { id: "actions", label: "", minWidth: "50px" },
];

type Props = {
  contacts?: APISchemas["SearchContactDto"][];
  isLoading: boolean;
  onVisible: () => void;
  hasNextPage: boolean;
};

export const SearchContactTable = (props: Props) => {
  const navigate = useNavigate();

  const contacts = props.contacts ?? [];

  return (
    <TableContainer sx={{ py: 3 }}>
      <Table aria-label="search contacts table" size="small">
        <TableHeader columns={columns} />
        {props.isLoading && <LoadingTable onVisible={props.onVisible} />}
        <TableBody>
          {contacts.map(contact => {
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
          {props.hasNextPage && <LoadingTable onVisible={props.onVisible} />}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const LoadingRow = () => {
  return (
    <>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell align="right">
        <IconButton aria-label="supprimer" color="primary">
          <ChevronRightIcon fontSize="navigateIcon" />
        </IconButton>
      </TableCell>
    </>
  );
};

const LoadingTable = ({ onVisible }: { onVisible: () => void }) => {
  const ref = useRef(null);
  const intersection = useIntersection(ref, {});
  const isIntersecting = intersection?.isIntersecting;
  const onVisibleRef = useRef(onVisible);
  onVisibleRef.current = onVisible;
  useEffect(() => {
    if (isIntersecting) {
      onVisibleRef.current();
    }
  }, [isIntersecting]);
  return (
    <>
      <StyledTableRow ref={ref}>
        <LoadingRow />
      </StyledTableRow>
      <StyledTableRow>
        <LoadingRow />
      </StyledTableRow>
      <StyledTableRow>
        <LoadingRow />
      </StyledTableRow>
    </>
  );
};
