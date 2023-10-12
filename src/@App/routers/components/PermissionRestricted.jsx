import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { ROLE } from '@App/configs/role';
import useAuth from '@App/hooks/useAuth';
import PermissionDenied from '@App/pages/Error/PermissionDenied';

export default function PermissionRestricted({ children, roleNames, aceptPermission, path, operation, fallback }) {
   const { user, userPermission } = useAuth();
   const hasPermissionAndOperation = useMemo(
      () => (path, userPermission, operation) => {
         const hasRole = roleNames.includes('*') ? true : roleNames.some((name) => name === user.role);
         if (aceptPermission && hasRole) return true;
         const { permissions } = userPermission;
         return (
            hasRole &&
            permissions.some((permission) => {
               return permission.type === path && permission.allowedActions.includes(operation);
            })
         );
      },
      [userPermission, path, operation, aceptPermission, roleNames]
   );
   const extendUserPermissions = userPermission ? userPermission[0] : [];
   if (hasPermissionAndOperation(path, extendUserPermissions, operation)) {
      return children;
   }
   return fallback;
}

PermissionRestricted.propTypes = {
   children: PropTypes.node.isRequired,
   roleNames: PropTypes.arrayOf(PropTypes.oneOf(Object.values(ROLE))).isRequired,
   operation: PropTypes.oneOf(['GET', 'CREATE', 'DELETE', 'UPDATE']),
   // path: PropTypes.oneOf(Object.values(conponent)),
   fallback: PropTypes.oneOfType([PropTypes.bool, PropTypes.node])
};
PermissionRestricted.defaultProps = {
   operation: 'GET',
   fallback: <PermissionDenied />,
   roleNames: []
};
