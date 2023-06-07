import { useEffect, useState } from "react";
import { useAPI } from "core/hooks";
import { Chip, Divider, Typography } from "@mui/material";

export const AccreditationsIcons = ({ idec }) => {
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
    })();
  }, [idec]);

  return (
    <>
      {pageState.data.map(acc => (
        <Chip
          key={`${JSON.stringify(acc)}-chip`}
          sx={{
            boxShadow: 1,
            borderRadius: 2,
            width: 400,
            minHeight: 50,
            margin: 1,
            padding: 3,
          }}
          label={
            <Divider>
              <Typography variant="body2">
                {acc.sourceId} {acc.year} {acc.period}
              </Typography>
              <Typography variant="body2">
                UE. {acc.identificationCode} {acc.identificationName}
              </Typography>
            </Divider>
          }
        />
      ))}
    </>
  );
};
