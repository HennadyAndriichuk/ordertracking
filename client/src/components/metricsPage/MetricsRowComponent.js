import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import DisplayMetric from './DisplayMetric';

const MetricsRowComponent = ({ metrics }) => {
  return (
    <>
      {metrics.map((metric, index) => (
        <TableRow key={index}>
          <TableCell>
            <DisplayMetric value={metric} />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default MetricsRowComponent;
