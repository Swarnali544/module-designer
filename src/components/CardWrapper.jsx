import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

// CardWrapper: Receives 'title', 'subtitle', and 'content' props
const CardWrapper = ({ title, subtitle, content }) => (
  <Card sx={{ minWidth: 200, margin: 2 }}>
    <CardContent>
      {title && (
        <Typography variant="h5" component="div">
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {subtitle}
        </Typography>
      )}
      {content && (
        <Typography variant="body2">
          {content}
        </Typography>
      )}
    </CardContent>
  </Card>
);

export default CardWrapper;
