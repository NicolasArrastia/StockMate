import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
};

const TruncatedText = ({ text }: Props) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      setIsOverflowing(
        textRef.current.scrollWidth > textRef.current.clientWidth
      );
    }
  }, [text]);

  return (
    <div
      ref={textRef}
      className="w-24 truncate"
      title={isOverflowing ? text : undefined}
    >
      {text}
    </div>
  );
};

export default TruncatedText;
