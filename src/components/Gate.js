import { PERMISSIONS, ROLES } from "../constants/permissions";
const hasPermission = ({ permissions, scopes }) => {
  const scopesMap = {};
  scopes.forEach((scope) => {
    scopesMap[scope] = true;
  });
  return permissions.some((permission) => scopesMap[permission]);
};
export default function Gate({ children, scopes = [] }) {
  const permissions = PERMISSIONS[ROLES.admin];
  const permissionGranted = hasPermission({ permissions, scopes });
  if (!permissionGranted) return <></>;
  return <>{children}</>;
}
