import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Footer } from "ui/shared/footer";
import { Users } from "ui/components/pages/users";
import { ContactsSearch } from "ui/components/pages/contacts/search";
import { ContactsDetail } from "ui/components/pages/contacts/detail";
import { Surveys } from "ui/components/pages/surveys";
import { Home } from "ui/components/pages/home";
import ResponsiveAppBar from "ui/shared/appBar";
import { useContext, useMemo } from "react";
import { UserAccountContext } from "ui/context/UserAccount";
import { canManageUser } from "core/role";

export const Router = () => {
  const { user } = useContext(UserAccountContext);
  const canMangeUserInApp = useMemo(() => canManageUser(user.roles), [user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/pilotage/accueil" />} />
        <Route
          path="/pilotage"
          element={
            <>
              <ResponsiveAppBar />
              <Outlet />
              <Footer />
            </>
          }
        >
          <Route path="accueil" element={<Home />} />
          {canMangeUserInApp && <Route path="utilisateurs" element={<Users />} />}
          <Route path="enquetes" element={<Surveys />} />
          <Route path="contacts/:idec" element={<ContactsDetail />} />
          <Route path="contacts" element={<ContactsSearch />} />
          <Route path="*" element={<Navigate to="/pilotage/accueil" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
