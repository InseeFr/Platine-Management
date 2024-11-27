import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import { ReactNode } from "react";

type Props = {
  onClose: () => void;
  open: boolean;
  title: string;
  children: ReactNode;
};

export const HistoryDialog = ({ onClose, open, children, title }: Props) => {
  return (
    <Dialog onClose={onClose} open={open} sx={{ ".MuiPaper-root": { maxWidth: "715px" } }}>
      <DialogTitle sx={{ pb: 2.5 }}>{title}</DialogTitle>
      <DialogContent
        sx={{
          minWidth: "715px",
          width: "fit-content",
          height: "450px",
        }}
      >
        <TableContainer>
          <Table>{children}</Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};
