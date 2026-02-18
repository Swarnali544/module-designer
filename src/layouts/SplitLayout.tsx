import React from 'react';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

export const SplitLayout = ({ left, right }: any) => {
  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />} 
      spacing={2}
      style={{ minHeight: '90vh', width:'81vw', padding : "16px" }}
    >
      <div style={{ flex: 1, height: '100%' }}>{left}</div>
      <div style={{ flex: 2, height: '100%' }}>{right}</div>
    </Stack>
  );
};
