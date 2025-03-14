import React from 'react'

export const LoaderScreen = ({ isVisible = false }) => {
  return (
    isVisible && (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    )
  );
};