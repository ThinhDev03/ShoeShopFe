import { createTheme as createMuiTheme, responsiveFontSizes } from '@mui/material/styles';
import overrides from './overrides';
import palette from './palette';
import typography from './typography';

export const createTheme = () => {
   const theme = createMuiTheme({
      ...palette,
      ...typography
   });
   theme.components = overrides(theme);

   return responsiveFontSizes(theme);
};
