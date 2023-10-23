import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Skeleton, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';

function FilterAction({ title, data, _title, _id, loading }) {
   const [expanded, setExpanded] = useState(true);

   return (
      <Accordion sx={{ boxShadow: 'none' }} expanded={expanded} onChange={() => setExpanded(!expanded)}>
         {data.isLoading ? (
            <Skeleton variant='rectangular' sx={{ width: '100%', height: 30 }} />
         ) : (
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#F15E2C' }} />}>
               <Typography
                  sx={{ color: '#F15E2C', fontSize: '22px !important', fontWeight: 600, textTransform: 'uppercase' }}>
                  {title}
               </Typography>
            </AccordionSummary>
         )}
         <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {data.isLoading
               ? Array.from({ length: 4 }, (_, index) => index).map((item) => (
                    <Skeleton variant='rectangular' sx={{ width: '100%', height: 30 }} key={item} />
                 ))
               : data?.data?.map((item) => {
                    return (
                       <Stack
                          key={item[_id]}
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
                          <Typography>{item[_title]}</Typography>
                          <CloseIcon sx={{ fontSize: '14px', fontWeight: 900, cursor: 'pointer' }} />
                       </Stack>
                    );
                 })}
         </AccordionDetails>
      </Accordion>
   );
}

export default React.memo(FilterAction);
