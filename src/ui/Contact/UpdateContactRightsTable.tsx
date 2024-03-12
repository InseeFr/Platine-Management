import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { theme } from "../../theme";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/system/Box";
import { Column, TableHeader } from "./AssociateSurveysTable";
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { mockedDataSurveyType } from "./ContactRightsEditDialog";

// TODO: use real ids
const columns: readonly Column[] = [
  { id: "source", label: "Source", minWidth: "310px" },
  { id: "year", label: "Millésime", minWidth: "95px" },
  { id: "periodicity", label: "Période", minWidth: "95px" },
  { id: "vague", label: "Vague", minWidth: "95px" },
  { id: "surveyUnit", label: "Unités enquêtées", minWidth: "155px" },

  { id: "identificationName", label: "Raison sociale", minWidth: "280px" },
  { id: "main", label: "Rôle", minWidth: "135px" },
  { id: "action", label: "Actions", minWidth: "150px", align: "center" },
];

// TODO: remove mocks
export const mockedData = [
  {
    source: "Source 1",
    year: "2018",
    periodicity: "M11",
    vague: "01",
    surveyUnit: "300000000",
    identificationName: "la raison sociale",
    main: true,
    secondaryContacts: [],
  },
  {
    source: "Source 2",
    year: "2020",
    periodicity: "M11",
    vague: "02",
    surveyUnit: "000000000",
    identificationName: "la raison sociale",
    main: false,
    secondaryContacts: [],
  },
  {
    source: "Source 3",
    year: "2021",
    periodicity: "M11",
    vague: "03",
    surveyUnit: "000000001",
    identificationName: "la raison sociale",
    main: true,
    secondaryContacts: [
      {
        identifier: "#MG01235",
        lastName: "Doe",
        firstName: "John",
      },
      {
        identifier: "#VG0123",
        lastName: "Nom",
        firstName: "Prenom",
      },
    ],
  },
];

type Props = {
  onAction: (v: { type: "delete" | "edit"; survey: mockedDataSurveyType }) => void;
};

export const UpdateContactRightsTable = ({ onAction }: Props) => {
  return (
    <Box>
      <TableContainer sx={{ py: 4 }}>
        <Table>
          <TableHeader columns={columns} />
          <TableBody>
            {mockedData.map(data => {
              return (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={`row-${data.source}`}
                  sx={{ borderBottom: `solid 1px ${theme.palette.text.hint}` }}
                >
                  {columns.map(column => {
                    const value = data[column.id as keyof typeof data];

                    if (column.id === "action") {
                      return (
                        <TableCell key={`action-${data.source}`} align="center">
                          <Box>
                            <IconButton
                              aria-label="modify"
                              color={"inherit"}
                              onClick={() => {
                                onAction({
                                  type: "edit",
                                  survey: data,
                                });
                              }}
                            >
                              <BorderColorOutlinedIcon />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              color={"inherit"}
                              onClick={() => {
                                onAction({
                                  type: "delete",
                                  survey: data,
                                });
                              }}
                            >
                              <DeleteOutlinedIcon />
                            </IconButton>
                          </Box>
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

                    return (
                      <TableCell key={column.id}>
                        {typeof value === "string" && (value ?? "NO DATA")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
