import { useEffect, useState } from "react";
import { DataGrid, frFR } from "@mui/x-data-grid";
import { useAPI } from "core/hooks";

const columns = [
  {
    field: "identifier",
    headerName: "Idec",
    width: 200,
    renderCell: cellValues => {
      return (
        <a href={`/pilotage/contacts/${cellValues.row.identifier}`} rel="noreferrer">
          {cellValues.row.identifier}
        </a>
      );
    },
  },
  { field: "lastName", headerName: "Nom", width: 300 },
  { field: "firstName", headerName: "Prénom", width: 300 },
  { field: "email", headerName: "Email", width: 300 },
  {
    field: "campaign",
    headerName: "Campagne / Unité enquêtée",
    width: 100,
    renderCell: cellValues => {
      return (
        <a href={`/${cellValues.row.access}`} target="_blank" rel="noreferrer">
          Lien
        </a>
      );
    },
  },
];

export const ContactsSearchResults = ({ formValues }) => {
  const { getContacts } = useAPI();

  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 5,
  });

  useEffect(() => {
    setPageState(old => ({ ...old, isLoading: true }));
    (async () => {
      const { data, error } = await getContacts({
        ...formValues,
        pageNo: pageState.page - 1,
        pageSize: pageState.pageSize,
      });
      if (!error && data) {
        setPageState(old => ({
          ...old,
          isLoading: false,
          data: data.content,
          total: data.totalElements,
        }));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageState.page, pageState.pageSize]);

  return (
    <>
      <h2>Résultats</h2>
      <p>{`Cliquez sur l'identifiant du contact pour consulter ou modifier ses coordonnées.`}</p>
      <div style={{ height: 400, width: "90%" }}>
        <DataGrid
          localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
          columns={columns}
          getRowId={row => pageState.data.indexOf(row)}
          rows={pageState.data}
          rowCount={pageState.total}
          loading={pageState.isLoading}
          rowsPerPageOptions={[5, 10, 50]}
          pagination
          page={pageState.page - 1}
          pageSize={pageState.pageSize}
          paginationMode="server"
          onPageChange={newPage => {
            setPageState(old => ({ ...old, page: newPage + 1 }));
          }}
          onPageSizeChange={newPageSize => setPageState(old => ({ ...old, pageSize: newPageSize }))}
        />
      </div>
    </>
  );
};
