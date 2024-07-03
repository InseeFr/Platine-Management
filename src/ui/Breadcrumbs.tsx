import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { NavLink } from "react-router-dom";

export type Item = { href: string; title: string } | string;

type Props = {
  items: Item[];
};

export function Breadcrumbs({ items }: Props) {
  return (
    <MuiBreadcrumbs
      aria-label="breadcrumb"
      sx={{
        py: 2,
        px: 4,
        typography: "titleSmall",
        ".MuiBreadcrumbs-separator": {
          color: "primary.main",
        },
      }}
    >
      {items.map(item => (
        <BreadcrumbsItem item={item} key={getKey(item)} />
      ))}
    </MuiBreadcrumbs>
  );
}

function getKey(item: Item) {
  if (typeof item === "string") {
    return item;
  }
  return item.href;
}

function BreadcrumbsItem({ item }: { item: Item }) {
  if (typeof item === "string") {
    return (
      <Box component="span" color="text.primary">
        {item}
      </Box>
    );
  }

  return (
    <Link component={NavLink} underline="hover" color="primary.main" to={item.href}>
      {item.title}
    </Link>
  );
}
