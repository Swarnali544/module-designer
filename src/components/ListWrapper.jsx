import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

// ListWrapper: Receives 'header' and 'items' props
const ListWrapper = ({ header, items }) => (
  <div>
    {header && (
      <Typography variant="h6" gutterBottom>
        {header}
      </Typography>
    )}
    <List>
      {items && items.map((item, idx) => (
        <ListItem key={idx}>
          <ListItemText primary={item.label} />
        </ListItem>
      ))}
    </List>
  </div>
);

export default ListWrapper;
