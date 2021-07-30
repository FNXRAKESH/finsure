import * as React from "react";
import Svg, { Path, Stop, LinearGradient } from "react-native-svg";

function Insurance(props) {
  return (
    <Svg
      height={512}
      viewBox="0 0 512 512"
      width={512}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <LinearGradient
        id="prefix__a"
        gradientUnits="userSpaceOnUse"
        x1={256}
        x2={256}
        y1={512}
        y2={0}
      >
        <Stop offset={0} stopColor="#00b59c" />
        <Stop offset={1} stopColor="#9cffac" />
      </LinearGradient>
      <LinearGradient
        id="prefix__b"
        gradientUnits="userSpaceOnUse"
        x1={256}
        x2={256}
        y1={361}
        y2={151}
      >
        <Stop offset={0} stopColor="#c3ffe8" />
        <Stop offset={0.997} stopColor="#f0fff4" />
      </LinearGradient>
      <Path
        d="M436 81.621c-83.027 0-169.071-76.961-169.923-77.732-5.719-5.185-14.436-5.185-20.154 0-.857.777-86.675 77.732-169.923 77.732-8.284 0-15 6.716-15 15v179.638c0 145.524 108.236 203.674 189.65 234.755a14.99 14.99 0 0010.7 0C375.504 467.434 451 399.455 451 276.259V96.621c0-8.284-6.716-15-15-15z"
        fill="url(#prefix__a)"
      />
      <Path
        d="M256 151c-57.897 0-105 47.103-105 105s47.103 105 105 105 105-47.103 105-105-47.103-105-105-105zm40.606 100.606l-45 45C248.678 299.535 244.839 301 241 301s-7.678-1.464-10.606-4.394l-15-15c-5.858-5.858-5.858-15.355 0-21.213 5.857-5.858 15.355-5.858 21.213 0l4.394 4.393 34.394-34.393c5.857-5.858 15.355-5.858 21.213 0 5.857 5.858 5.857 15.355-.002 21.213z"
        fill="url(#prefix__b)"
      />
    </Svg>
  );
}

export default Insurance;
