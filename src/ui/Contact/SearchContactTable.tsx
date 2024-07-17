import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { Column, TableHeader } from "../TableComponents.tsx";
import { APISchemas } from "../../types/api.ts";
import TableCell from "@mui/material/TableCell";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Skeleton, TableRow } from "@mui/material";
import { useEffect, useRef } from "react";
import { useIntersection } from "react-use";
import { Link } from "../Link.tsx";
import { theme } from "../../theme.tsx";

const columns: readonly Column[] = [
  { id: "identifier", label: "ID", minWidth: "140px" },
  { id: "name", label: "Prénom/Nom", minWidth: "95px" },
  { id: "email", label: "Email", minWidth: "95px" },
  { id: "actions", label: "", minWidth: "50px" },
];

export const style = {
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.background.default,
    },
    border: `1px solid ${theme.palette.border.default}`,
    textDecoration: "none",
  },
};

type Props = {
  contacts?: APISchemas["SearchContactDto"][];
  isLoading: boolean;
  onVisible: () => void;
  hasNextPage: boolean;
};

export const SearchContactTable = (props: Props) => {
  const contacts = props.contacts ?? [];

  return (
    <TableContainer sx={{ py: 3 }}>
      <Table aria-label="search contacts table" size="small">
        <TableHeader columns={columns} />
        {props.isLoading && <LoadingTable onVisible={props.onVisible} />}
        <TableBody>
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
                <TableCell>{contact.email}</TableCell>
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

export const LoadingRow = () => {
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
        <ChevronRightIcon fontSize="navigateIcon" color="primary" />
      </TableCell>
    </>
  );
};

export const LoadingTable = ({ onVisible }: { onVisible: () => void }) => {
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
      <TableRow ref={ref}>
        <LoadingRow />
      </TableRow>
      <TableRow>
        <LoadingRow />
      </TableRow>
      <TableRow>
        <LoadingRow />
      </TableRow>
    </>
  );
};
