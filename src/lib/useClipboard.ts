import { useState } from "react";

export const useClipboard = () => {
  const [copied, setCopied] = useState<Boolean>(false);

  const onCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return [onCopy, copied] as const;
};
