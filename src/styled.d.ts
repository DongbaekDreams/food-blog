declare namespace JSX {
  interface IntrinsicElements {
    style: React.CSSProperties & { jsx?: boolean; global?: boolean };
  }
} 