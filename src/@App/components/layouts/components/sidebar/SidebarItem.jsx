import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { ListItemButton, ListItemText } from '@mui/material';
import List from '@mui/material/List';
import menuCofig from '@App/configs/menuConfig';
import { Stack } from '@mui/system';

export default function SidebarItem({ setOpenSidebar }) {
   const [expanded, setExpanded] = React.useState([]);
   const handleChange = (panel) => (event, newExpanded) => {
      setExpanded((prev) => {
         if (newExpanded) {
            return [...prev, panel];
         }
         const index = prev.findIndex((item) => item === panel);
         prev.splice(index, 1);
         return [...prev];
      });
   };
   const handleCloseSidebar = (e) => {
      if (!setOpenSidebar) return;
      setOpenSidebar(false);
   };
   return (
      <WrapSidebar>
         <List>
            {menuCofig.map((menu, index) => {
               const Icon = menu.icon;
               if (!menu?.children) {
                  return (
                     <ListItemButton
                        component={LinkSidebar}
                        onClick={handleCloseSidebar}
                        to={menu.path}
                        alignItems='center'
                        sx={{ gap: 1, padding: '12px 16px !important' }}>
                        <Icon sx={{ fontSize: '20px' }} />
                        <Typography>{menu.title}</Typography>
                     </ListItemButton>
                  );
               }
               return (
                  <Accordion square={false} expanded={expanded.includes(index)} onChange={handleChange(index)}>
                     <AccordionSummary
                        component={ListItemButton}
                        sx={{ height: '40px !important' }}
                        aria-controls='panel1d-content'
                        id='panel1d-header'>
                        <Stack direction='row' gap={1} alignItems='center'>
                           <Icon sx={{ fontSize: '20px' }} />
                           <Typography sx={{}}>{menu.title}</Typography>
                        </Stack>
                     </AccordionSummary>
                     <AccordionDetails>
                        {menu.children.map((child, index) => {
                           return (
                              <ListItemButton
                                 component={LinkSidebar}
                                 alignItems='center'
                                 sx={{ gap: 1 }}
                                 to={child.path}
                                 onClick={handleCloseSidebar}
                                 key={menu.id + index}
                                 end>
                                 <ListItemText
                                    sx={{ fontSize: '11px' }}
                                    primaryTypographyProps={{ fontSize: '14px' }}
                                    primary={child.title}
                                 />
                              </ListItemButton>
                           );
                        })}
                     </AccordionDetails>
                  </Accordion>
               );
            })}
         </List>
      </WrapSidebar>
   );
}
const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
   '&:not(:last-child)': {
      borderBottom: 0
   },
   '&:before': {
      display: 'none'
   },
   '& .Mui-expanded': {
      backgroundColor: theme.palette.background.default
   }
}));

const AccordionSummary = styled((props) => (
   <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.7rem' }} />} {...props} />
))(({ theme }) => ({
   boxShadow: 'unset',
   flexDirection: 'row',
   paddingLeft: theme.spacing(2),

   '& .MuiAccordionSummary-expandIconWrapper': {},
   '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)'
   },
   '& .MuiAccordionSummary-content': {
      margin: 0
   }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
   padding: 0,
   backgroundColor: theme.palette.background.default
}));
export const LinkSidebar = styled(NavLink)(({ theme }) => ({
   textDecoration: 'none',
   color: '#000',
   display: 'block',
   padding: '8px 14px 8px 32px !important',
   '&.active': {
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
      ':hover': {
         backgroundColor: theme.palette.primary.main,
         color: '#fff'
      }
   },
   '&.active > .MuiButtonBase-root > svg': {
      // color: 'blue'
   }
}));

const WrapSidebar = styled('aside')(({ theme }) => ({
   boxSizing: 'border-box',
   backgroundColor: theme.palette.education.sidebar.bg,
   fontSize: 15,
   width: theme.palette.education.sidebar.width,
   height: `calc(100vh - ${theme.palette.education.header.height}px)`,
   top: theme.palette.education.header.height,
   left: 0,
   overflow: 'auto',
   minHeight: '500px',
   borderRight: '1px solid rgba(162, 162, 162, 0.4)',
   [theme.breakpoints.down('lg')]: {
      height: '100vh',
      borderRight: 'unset'
   }
}));
