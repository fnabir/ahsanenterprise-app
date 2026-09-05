import { TransactionData } from "@repo/types";
import { Button, DialogDelete, DialogTransaction, Number } from "@repo/ui";
import { FaPlus } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { deleteTransaction } from "@repo/firebase";
import { useMemo, useState } from "react";

export default function TransactionSection({
  type,
  id,
  bills,
  payments,
  totalBill,
  totalPayment,
}: {
  type: "staff" | "importer";
  id: string;
  bills: [string, TransactionData][];
  payments: [string, TransactionData][];
  totalBill: number;
  totalPayment: number;
}) {
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);

  const billRows = useMemo(() => [...bills].reverse(), [bills]);
  const paymentRows = useMemo(() => [...payments].reverse(), [payments]);

  const handleDelete = async (
    key: string,
    transactionType: "bill" | "payment",
  ) => {
    await deleteTransaction(id, type, transactionType, key);
    setOpenDialogId(null);
  };

  return (
    <div className="flex-1 min-h-0 flex divide-x-2">
      <div className="grow overflow-y-auto px-2 lg:px-4">
        <div className="flex items-center justify-between border-b-2">
          <div className="flex items-center gap-2">
            <div className="font-bold py-2">Bills</div>
            {type === "staff" && (
              <DialogTransaction id={id} type="staff" transactionType="bill">
                <Button
                  variant="subtle"
                  label="Add"
                  Icon={<FaPlus size={12} />}
                />
              </DialogTransaction>
            )}
          </div>
          <div className="font-bold py-2">
            <Number
              value={totalBill}
              valueType="currency"
              className="font-bold text-danger"
            />
          </div>
        </div>
        {!bills.length ? (
          <div className=" my-4 text-center text-muted">No bills found.</div>
        ) : (
          <table className="w-full table-auto rounded-lg">
            <thead className="sticky top-0 bg-background z-10">
              <tr className="text-muted text-sm border-b-2">
                <th className="text-left font-medium py-2">Date</th>
                <th className="text-left font-medium py-2">Transaction</th>
                <th className="text-right font-medium py-2">Amount</th>
              </tr>
            </thead>

            <tbody className="divide-y-2">
              {billRows.map(([key, transaction]) => {
                const style =
                  transaction.value > 0 ? "text-danger" : "text-success";
                const dialogId = `bill:${key}`;
                return (
                  <tr key={key} className="hover:bg-muted-subtle text-sm">
                    <td>{transaction.date}</td>
                    <td className="px-2 py-1">
                      <div className="font-bold">{transaction.title}</div>
                      <div className="text-muted text-xs">
                        {transaction.details}
                      </div>
                    </td>
                    <td className="px-2 py-1">
                      <Number
                        value={transaction.value ?? 0}
                        valueType="currency"
                        className={`font-bold justify-end ${style}`}
                      />
                    </td>
                    <td className="px-2 max-w-0 py-1">
                      <DialogDelete
                        title="Delete Transaction"
                        trigger={
                          <Button
                            variant="custom"
                            Icon={<MdClose size={16} />}
                            className="bg-danger-subtle text-danger hover:bg-danger hover:text-danger-subtle p-1!"
                          />
                        }
                        onDelete={() => handleDelete(key, "bill")}
                        open={openDialogId === dialogId}
                        setOpen={(isOpen) =>
                          setOpenDialogId(isOpen ? dialogId : null)
                        }
                      >
                        Are you sure you want to delete this transaction? This
                        cannot be undone.
                      </DialogDelete>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <div className="grow overflow-y-auto px-2 lg:px-4">
        <div className="flex items-center justify-between border-b-2">
          <div className="flex items-center gap-2">
            <div className="font-bold py-2">Payments</div>
            <DialogTransaction id={id} type={type} transactionType="payment">
              <Button
                variant="subtle"
                label="Add"
                Icon={<FaPlus size={12} />}
              />
            </DialogTransaction>
          </div>
          <div className="font-bold py-2">
            <Number
              value={totalPayment}
              valueType="currency"
              className="font-bold text-success"
            />
          </div>
        </div>
        {!payments.length ? (
          <div className=" my-4 text-center text-muted">No payments found.</div>
        ) : (
          <table className="w-full table-auto rounded-lg">
            <thead className="sticky top-0 bg-background z-10">
              <tr className="text-muted text-sm border-b-2">
                <th className="text-left font-medium py-2">Date</th>
                <th className="text-left font-medium py-2">Transaction</th>
                <th className="text-right font-medium py-2">Amount</th>
              </tr>
            </thead>

            <tbody className="divide-y-2">
              {paymentRows.map(([key, transaction]) => {
                const style =
                  transaction.value > 0 ? "text-success" : "text-foreground";
                const dialogId = `payment:${key}`;
                return (
                  <tr key={key} className="hover:bg-muted-subtle text-sm">
                    <td>{transaction.date}</td>
                    <td className="px-2 py-1">
                      <div className="font-bold">{transaction.title}</div>
                      <div className="text-muted text-xs">
                        {transaction.details}
                      </div>
                    </td>
                    <td className="px-2 py-1">
                      <Number
                        value={transaction.value ?? 0}
                        valueType="currency"
                        className={`font-bold justify-end ${style}`}
                      />
                    </td>
                    <td className="px-2 max-w-0">
                      <DialogDelete
                        title="Delete Transaction"
                        trigger={
                          <Button
                            variant="custom"
                            Icon={<MdClose size={16} />}
                            className="bg-danger-subtle text-danger hover:bg-danger hover:text-danger-subtle p-1!"
                          />
                        }
                        onDelete={() => handleDelete(key, "payment")}
                        open={openDialogId === dialogId}
                        setOpen={(isOpen) =>
                          setOpenDialogId(isOpen ? dialogId : null)
                        }
                      >
                        Are you sure you want to delete this transaction? This
                        cannot be undone.
                      </DialogDelete>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
