import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';

function AccordionDescription() {
   const [expanded, setExpanded] = useState(false);

   const handleChange = (panel) => (event, isExpanded) => {
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
               <Typography sx={{ pl: 3 }}>
                  Giới tính: Unisex
                  <br />
                  Form dáng: Regular
                  <br />
                  Chất liệu: Single Jersey, định lượng 220GSM
                  <br />
                  Thành phần chất liệu: 100% Cotton
                  <br />
                  Size: S – M – L – XL
                  <br />
                  Hoạ tiết: Love, Peace &amp; Music
                  <br />
                  Sử dụng phương pháp in lụa.
               </Typography>
            </AccordionDetails>
         </Accordion>
         <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} sx={{ boxShadow: 'none' }}>
            <AccordionSummary
               expandIcon={
                  <ExpandMoreIcon
                     sx={({ palette }) => ({ color: expanded === 'panel1' && palette.education.text.main })}
                  />
               }
               aria-controls='panel2bh-content'
               id='panel2bh-header'>
               <Box sx={{ borderTop: '1px dashed #333' }}></Box>
               <Typography
                  sx={({ palette }) => ({
                     fontWeight: 600,
                     color: expanded === 'panel1' ? palette.education.text.main : palette.education.text.black
                  })}>
                  QUY ĐỊNH ĐỔI SẢN PHẨM
               </Typography>
            </AccordionSummary>
            <AccordionDetails>
               <Box sx={{ borderTop: '1px dashed #333', mb: 3 }}></Box>
               <Typography sx={{ pl: 3 }}>
                  Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar diam eros in
                  elit. Pellentesque convallis laoreet laoreet.
               </Typography>
            </AccordionDetails>
         </Accordion>
      </React.Fragment>
   );
}

export default React.memo(AccordionDescription);
