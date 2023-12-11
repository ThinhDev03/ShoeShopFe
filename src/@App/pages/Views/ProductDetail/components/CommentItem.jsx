import { Avatar, Grid, Paper, Rating } from '@mui/material';
import { format } from 'date-fns';
import React from 'react';

export default function CommentItem({ description, user_name, createdAt, rate }) {
   return (
      <Paper style={{ padding: '20px', marginTop: 10 }}>
         <Grid container wrap='nowrap' spacing={2}>
            <Grid item>
               <Avatar alt='Remy Sharp' />
            </Grid>
            <Grid justifyContent='left' item xs zeroMinWidth>
               <h4 style={{ margin: 0, textAlign: 'left', textTransform: 'capitalize' }}>{user_name}</h4>
               <p style={{ textAlign: 'left' }}>{description}</p>
               <p style={{ textAlign: 'left', color: 'gray', fontSize: '14px' }}>
                  {format(new Date(createdAt), "yyyy-M-dd")}
               </p>
               <Rating value={rate} readOnly size='small' />
            </Grid>
         </Grid>
      </Paper>
   );
}
