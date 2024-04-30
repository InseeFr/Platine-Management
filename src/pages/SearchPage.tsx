import { SearchPanel } from "../ui/Search/SearchPanel.tsx";
import { SidebarLayout } from "../ui/Layout/SidebarLayout.tsx";
import { Breadcrumbs } from "../ui/Breadcrumbs.tsx";
import { Outlet } from "react-router-dom";

const breadcrumbs = [{ href: "/", title: "Accueil" }, "Recherche avancée"];

export function SearchPage() {
  return (
    <div>
      <Breadcrumbs items={breadcrumbs} />
      <SidebarLayout>
        <SearchPanel />
        <Outlet />
      </SidebarLayout>
    </div>
  );
}
