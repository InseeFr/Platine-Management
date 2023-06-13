import { useEffect, useState } from "react";

import { useAPI } from "core/hooks";
import { DataGrid, frFR } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

const columns = [
  {
    field: "sourceId",
    headerName: "Identifiant source",
    width: "200",
  },
  {
    field: "sourceWording",
    headerName: "Description Source",
    width: "200",
  },
  { field: "year", headerName: "Année", width: "200" },
  { field: "period", headerName: "Période", width: "200" },
  { field: "partition", headerName: "Partition", width: "200" },
  { field: "identificationCode", headerName: "Identifiant unité enquêtée", width: "200" },
  { field: "identificationName", headerName: "Nom unité enquêtée", width: "300" },
  { field: "main", headerName: "Est principal", width: "300" },
];

export const AccreditationsDetail = ({ idec }) => {
  const [accreditations, setAccreditations] = useState([]);
  const { getContactAccreditations } = useAPI();

  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
  });

  useEffect(() => {
    setPageState(old => ({ ...old, isLoading: true }));
    (async () => {
      const { data } = await getContactAccreditations(idec);
      setPageState(old => ({
        ...old,
        isLoading: false,
        data: data,
      }));

      setAccreditations(data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idec]);

  return (
    <>
      <Typography variant="h4"> Habilitations </Typography>
      <Box sx={{ width: "100%" }}>
        <DataGrid
          autoHeight
          {...pageState.data}
          localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
          columns={columns}
          getRowId={row => accreditations.indexOf(row)}
          rows={pageState.data}
          loading={pageState.isLoading}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </>
  );
};
