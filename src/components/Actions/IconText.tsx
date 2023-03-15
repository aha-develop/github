import React, { memo } from "react";

interface IconTextProps {
  icon: string;
  text?: string;
  style?: any;
  iconStyle?: any;
}

const IconText: React.FC<IconTextProps> = ({
  icon,
  text,
  style,
  iconStyle,
}) => (
  <span style={style ? { ...style } : {}}>
    <aha-icon
      icon={`${icon} type-icon`}
      style={iconStyle ? { ...iconStyle } : {}}
    />
    <span style={{ marginLeft: "5px" }}>{text}</span>
  </span>
);

export default memo(IconText);
