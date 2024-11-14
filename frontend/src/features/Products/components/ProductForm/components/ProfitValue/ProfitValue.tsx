type Props = {
  price?: number;
  costPrice?: number;
  isPercentageFirst?: boolean;
};

const ProfitValue = ({
  price = 0,
  costPrice = 0,
  isPercentageFirst = false,
}: Props) => {
  const isValidValues = price !== 0 && costPrice !== 0;
  const profitValue = isValidValues ? price - costPrice : 0;
  const profitPercent = (
    isValidValues ? (profitValue / costPrice) * 100 : 0
  ).toFixed(2);
  const profitColor = profitValue > 0 ? "text-green-600" : "text-red-600";

  const valuesOrder = isPercentageFirst
    ? [`${profitPercent}%`, `${profitValue}$`]
    : [`${profitValue}$`, `${profitPercent}%`];

  return (
    <span
      className={`text-xl w-fit items-center font-bold flex flex-col ${profitColor}`}
    >
      {valuesOrder.map((value, index) => (
        <span key={index} className={index === 1 ? "text-xs" : ""}>
          {value}
        </span>
      ))}
    </span>
  );
};

export default ProfitValue;
