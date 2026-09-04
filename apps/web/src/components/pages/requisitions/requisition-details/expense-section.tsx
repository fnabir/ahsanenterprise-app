import { RequisitionFile } from "@repo/types";
import { Number } from "@repo/ui";

export interface RequisitionExpense extends RequisitionFile {
  fileNo: string;
  itemName?: string;
  lc?: string | null;
  duty?: number;
}

export default function ExpenseSection({
  data,
}: {
  data?: RequisitionExpense[];
}) {
  if (!data?.length) return null;

  const fields = [
    { label: "Item Name", key: "itemName" },
    { label: "L/C No", key: "lc" },
    { label: "Duty", key: "duty", isCurrency: true },
    { label: "Port Charge", key: "port", isCurrency: true },
    { label: "NOC", key: "noc", isCurrency: true },
    { label: "Examine for Lab Test", key: "examine", isCurrency: true },
    { label: "Section Change", key: "section", isCurrency: true },
    { label: "Labour", key: "labour", isCurrency: true },
    { label: "Truck", key: "truck", isCurrency: true },
    { label: "Assessment / Delivery", key: "assessment", isCurrency: true },
  ];

  const shouldShowRow = (
    key: keyof RequisitionExpense,
    data: RequisitionExpense[],
  ) => {
    return data.some((expense) => {
      const value = expense[key];
      return value !== undefined && value !== null && value !== 0;
    });
  };

  const subtotalPerFile = data.map((expense) => {
    const keys: (keyof RequisitionExpense)[] = [
      "duty",
      "port",
      "noc",
      "examine",
      "section",
      "labour",
      "truck",
      "assessment",
    ];

    return keys.reduce((sum, key) => {
      const value = expense[key];
      return sum + (typeof value === "number" ? value : 0);
    }, 0);
  });

  const total = subtotalPerFile.reduce((sum, subtotal) => sum + subtotal, 0);

  return (
    <table className="min-w-full border-collapse">
      <tbody>
        {fields.map(({ label, key }) => {
          if (!shouldShowRow(key as keyof RequisitionExpense, data)) {
            return null;
          }
          return (
            <tr key={key}>
              <th className="border border-foreground px-2 py-1 text-left">
                {label}
              </th>

              {data.map((expense) => {
                const value = expense[key as keyof RequisitionExpense];
                const isCurrency =
                  fields.find((field) => field.key === key)?.isCurrency &&
                  typeof value === "number";
                return (
                  <td
                    key={expense.fileNo + "-" + key}
                    className={`border border-foreground px-2 py-1 ${key === "itemName" ? "font-bold text-center" : "text-end"}`}
                  >
                    {isCurrency ? (
                      <Number
                        value={value ?? 0}
                        valueType="currency"
                        fractionDigits={2}
                        currency="TK."
                        currencyClassName="w-full text-start"
                      />
                    ) : (
                      (expense[key as keyof RequisitionExpense] ?? "-")
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
        <tr>
          <th className="border border-foreground px-2 py-1 text-left font-bold">
            Subtotal
          </th>

          {subtotalPerFile.map((total, idx) => (
            <td
              key={"subtotal-" + idx}
              className="border border-foreground px-2 py-1 text-end font-bold"
            >
              <Number
                value={total}
                valueType="currency"
                fractionDigits={2}
                currency="TK."
                currencyClassName="w-full text-start"
              />
            </td>
          ))}
        </tr>

        <tr>
          <th className="border border-foreground px-2 py-1 text-left font-bold">
            Total
          </th>

          <td
            colSpan={data.length - 1}
            className="border border-b-foreground"
          />
          <td className="border border-foreground px-2 py-1 text-end font-bold">
            <Number
              value={total}
              valueType="currency"
              fractionDigits={2}
              currency="TK."
              currencyClassName="w-full text-start"
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
