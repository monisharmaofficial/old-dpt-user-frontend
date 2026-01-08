import React, { useEffect, useState } from 'react';
import './loading.css'

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const LoadingFallback = () => (
  <SkeletonTheme color="#202020" highlightColor="#444">
    <section>
      <Skeleton height={100} width={100} />
    </section>
  </SkeletonTheme>
);


export default LoadingFallback;
