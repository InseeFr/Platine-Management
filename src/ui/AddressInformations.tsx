import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { APISchemas } from "../types/api.ts";

type Props = {
  identificationName?: string;
  address?: APISchemas["AddressDto"];
};
export const AddressInformations = ({ identificationName, address }: Props) => {
  const street = [
    address?.streetNumber,
    address?.repetitionIndex?.toLowerCase(),
    address?.streetType,
    address?.streetName,
  ]
    .filter(element => element !== "" && element !== undefined && element !== null)
    .join(" ");

  const formattedAddress = [street, address?.zipCode, address?.cityName]
    .filter(element => element !== "" && element !== undefined && element !== null)
    .join(", ");

  const cedex = [address?.cedexName, address?.cedexCode, address?.countryName]
    .filter(element => element !== "" && element !== undefined && element !== null)
    .join(", ");

  return (
    <Stack spacing={1} typography={"bodyMedium"}>
      {identificationName && <Box component={"span"}>{identificationName}</Box>}
      {formattedAddress && <Box component={"span"}>{formattedAddress}</Box>}
      {cedex && <Box component={"span"}>{cedex}</Box>}
      {address?.addressSupplement && <Box component={"span"}>{address?.addressSupplement}</Box>}
      {address?.specialDistribution && <Box component={"span"}>{address?.specialDistribution}</Box>}
    </Stack>
  );
};
