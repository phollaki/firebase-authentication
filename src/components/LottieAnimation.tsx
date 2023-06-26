"use client";
import React, { useRef } from "react";

interface Props {
  animationData?: any;
}

function LottieAnimation({ animationData }: Props) {
  const ref = useRef(null);

  React.useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <lottie-player
      id="firstLottie"
      ref={ref}
      autoplay
      // controls
      loop
      mode="normal"
      src={animationData}
      style={{marginTop: '-150px'}}
    ></lottie-player>
  );
}

export default LottieAnimation;
