// import React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';

// // CardWrapper: Receives 'title', 'subtitle', and 'content' props
// const CardWrapper = ({ title, subtitle, content }) => (
//   <Card sx={{ minWidth: 200, margin: 2 }}>
//     <CardContent>
//       {title && (
//         <Typography variant="h5" component="div">
//           {title}
//         </Typography>
//       )}
//       {subtitle && (
//         <Typography sx={{ mb: 1.5 }} color="text.secondary">
//           {subtitle}
//         </Typography>
//       )}
//       {content && (
//         <Typography variant="body2">
//           {content}
//         </Typography>
//       )}
//     </CardContent>
//   </Card>
// );

// export default CardWrapper;

import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const renderValue = (val) => {
  if (val == null) return null;

  // If primitive → render directly
  if (typeof val !== "object") return val;

  // If array → join or stringify
  if (Array.isArray(val)) {
    return val.map((v, i) => <div key={i}>{renderValue(v)}</div>);
  }

  // If object → render key-value
  return Object.entries(val).map(([key, value]) => (
    <div key={key}>
      <b>{key}: </b>
      {renderValue(value)}
    </div>
  ));
};

const CardWrapper = ({ title, subtitle, content }) => (
  <Card sx={{ minWidth: 200, margin: 2 }}>
    <CardContent>
      {title && (
        <Typography variant="h5" component="div">
          {renderValue(title)}
        </Typography>
      )}

      {subtitle && (
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {renderValue(subtitle)}
        </Typography>
      )}

      {content && (
        <Typography variant="body2" component="div">
          {renderValue(content)}
        </Typography>
      )}
    </CardContent>
  </Card>
);

export default CardWrapper;

