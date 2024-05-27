import type { ReactNode } from "react";

export default function CustomLabel({
  children,
  style,
}: {
  children: ReactNode;
  style?: React.CSSProperties;
}): JSX.Element {
  return (
    <div className="Polaris-Labelled__LabelWrapper" style={{ ...style }}>
      <div className="Polaris-Label">
        <label
          id=":R2q6:Label"
          htmlFor=":R2q6:"
          className="Polaris-Label__Text"
        >
          {children}
        </label>
      </div>
    </div>
  );
}
