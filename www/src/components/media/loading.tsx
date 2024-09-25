// src/components/media/loading.tsx
import React from 'react';
import { CircularProgress, CircularProgressProps } from '@mui/material';

const CustomCircularProgress = (props: CircularProgressProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <CircularProgress
        {...props}
        size={64}
        sx={{
          color: '#ff8b66',
          '& .MuiCircularProgress-circleDeterminate': {
            color: '#ff8b66',
          },
        }}
      />
    </div>
  );
};

export default CustomCircularProgress;