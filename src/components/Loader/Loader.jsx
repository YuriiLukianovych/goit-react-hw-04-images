import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

function Loader() {
  return (
    <>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="var(--accent)"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </>
  );
}

export default Loader;
