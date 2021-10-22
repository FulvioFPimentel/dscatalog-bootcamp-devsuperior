import React from 'react';
import ContentLoader from 'react-content-loader';

const CategoryCardLoader = () => (
  <ContentLoader 
    speed={1}
    width="100%"
    height={460}
    backgroundColor="#ecebeb"
    foregroundColor="#d6d2d2"
  >
    <rect x="0" y="0" rx="10" ry="10" width="2000" height="92" />
    <rect x="0" y="115" rx="10" ry="10" width="2000" height="92" />
  </ContentLoader>
)

export default CategoryCardLoader;