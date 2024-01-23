import { SearchPanel } from "./SearchPanel.tsx";
import { ContactsList } from "./contacts/ContactList";
import { SidebarLayout } from "../ui/Layout/SidebarLayout.tsx";
import { Breadcrumbs } from "../ui/Breadcrumbs.tsx";
import { type ReactNode } from "react";

interface SearchProps {
  children?: ReactNode;
  tab: number;
}

const breadcrumbs = [{ href: "/", title: "Accueil" }, "Recherche avancée"];

export function SearchPage(props: SearchProps) {
  const { tab } = props;

  return (
    <div>
      <Breadcrumbs items={breadcrumbs} />
      <SidebarLayout>
        <SearchPanel defaultTab={tab} />
        <ContactsList />
      </SidebarLayout>
    </div>
  );
}
