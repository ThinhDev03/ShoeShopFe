import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';

function AccordionDescription({ product }) {
   const [expanded, setExpanded] = useState(false);

   const handleChange = (panel) => (_, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
   };

   return (
      <React.Fragment>
         <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{ boxShadow: 'none' }}>
            <AccordionSummary
               expandIcon={
                  <ExpandMoreIcon
                     sx={({ palette }) => ({ color: expanded === 'panel1' && palette.education.text.main })}
                  />
               }
               aria-controls='panel1bh-content'
               id='panel1bh-header'>
               <Typography
                  variant='h6'
                  sx={({ palette }) => ({
                     fontWeight: 600,
                     color: expanded === 'panel1' ? palette.education.text.main : palette.education.text.black
                  })}>
                  THÔNG TIN SẢN PHẨM
               </Typography>
            </AccordionSummary>
            <AccordionDetails>
               <Box sx={{ borderTop: '1px dashed #333', mb: 3 }}></Box>
               <Box
                  sx={{ pl: 3 }}
                  dangerouslySetInnerHTML={{ __html: (!product.isLoading && product.data.description) || '' }}></Box>
            </AccordionDetails>
         </Accordion>
      </React.Fragment>
   );
}

export default React.memo(AccordionDescription);
