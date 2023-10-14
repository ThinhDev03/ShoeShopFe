import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';

function FilterAction(props) {
   const [expanded, setExpanded] = useState(true);
   const { title, data } = props;

   return (
      <Accordion sx={{ boxShadow: 'none' }} expanded={expanded} onChange={() => setExpanded(!expanded)}>
         <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#F15E2C' }} />}>
            <Typography
               sx={{ color: '#F15E2C', fontSize: '22px !important', fontWeight: 600, textTransform: 'uppercase' }}>
               {title}
            </Typography>
         </AccordionSummary>
         <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {data.map((item, index) => {
               return (
                  <Stack
                     key={index}
                     sx={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 3,
                        py: '6px',
                        px: 3,
                        ':hover': {
                           bgcolor: '#f1f1f1'
                        }
                     }}>
                     <Typography>{item}</Typography>
                     <CloseIcon sx={{ fontSize: '14px', fontWeight: 900, cursor: 'pointer' }} />
                  </Stack>
               );
            })}
         </AccordionDetails>
      </Accordion>
   );
}

export default React.memo(FilterAction);
