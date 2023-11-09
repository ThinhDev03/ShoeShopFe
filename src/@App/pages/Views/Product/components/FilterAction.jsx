import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Divider, Skeleton, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';

function FilterAction({ title, data, pathLabel, pathKey, pathName, setValue, control, currentValue }) {
   const [expanded, setExpanded] = useState(true);
   const { data: list, isLoading } = data;

   return (
      <>
         <Accordion sx={{ boxShadow: 'none' }} expanded={expanded} onChange={() => setExpanded(!expanded)}>
            {isLoading ? (
               <Skeleton variant='rectangular' sx={{ width: '100%', height: 30 }} />
            ) : (
               <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#F15E2C' }} />}>
                  <Typography
                     sx={{
                        color: '#F15E2C',
                        fontSize: '22px !important',
                        fontWeight: 600,
                        textTransform: 'uppercase'
                     }}>
                     {title}
                  </Typography>
               </AccordionSummary>
            )}
            <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
               {isLoading
                  ? Array.from({ length: 4 }, (_, index) => index).map((item) => (
                       <Skeleton variant='rectangular' sx={{ width: '100%', height: 30 }} key={item} />
                    ))
                  : list?.map((item) => {
                       const selected = currentValue === item[pathKey];
                       return (
                          <Stack
                             key={item[pathKey]}
                             onClick={() => setValue(pathName, selected ? '' : item[pathKey])}
                             sx={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: 3,
                                py: '6px',
                                px: 3,
                                borderRadius: '5px',
                                bgcolor: selected ? '#f1f1f1' : '#fff',
                                ':hover': {
                                   bgcolor: '#f1f1f1',
                                   cursor: 'pointer'
                                }
                             }}>
                             <Typography textTransform='capitalize'>{item[pathLabel]}</Typography>
                             {selected && <CloseIcon sx={{ fontSize: '14px', fontWeight: 900, cursor: 'pointer' }} />}
                          </Stack>
                       );
                    })}
            </AccordionDetails>
         </Accordion>
         <Divider />
      </>
   );
}

export default FilterAction;
