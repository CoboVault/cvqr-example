import React from "react";
// @ts-ignore
import QRCode from "qrcode.react";

export const BaseQRCode = ({
  size = 200,
  data = "",
  ecl = "L",
}: {
  data: string;
  size?: number;
  ecl?: "L" | "M" | "Q" | "H";
}) => {
  return <QRCode value={data} size={size} level={ecl} />;
};
