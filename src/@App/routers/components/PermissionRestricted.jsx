import React from 'react';

import useAuth from '@App/hooks/useAuth';

export default function PermissionRestricted({ children, roleNames, fallback }) {
   const { userPermission, isAuththentication } = useAuth();
   if (isAuththentication && roleNames.includes(userPermission)) {
      return children;
   }
   return fallback;
}

PermissionRestricted.defaultProps = {
   fallback: <></>,
   roleNames: []
};
