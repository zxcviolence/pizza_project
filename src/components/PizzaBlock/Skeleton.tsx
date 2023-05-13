import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton: React.FC = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={467}
    viewBox="0 0 280 467"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="136" cy="148" r="133" />
    <rect x="-1" y="292" rx="0" ry="0" width="299" height="31" />
    <rect x="-2" y="333" rx="0" ry="0" width="287" height="93" />
    <rect x="1" y="434" rx="0" ry="0" width="100" height="36" />
    <rect x="139" y="433" rx="0" ry="0" width="141" height="39" />
  </ContentLoader>
);

export default Skeleton;
