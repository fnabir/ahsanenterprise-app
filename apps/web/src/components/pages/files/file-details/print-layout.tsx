import { useFileDetailsContext } from "@/contexts/FileDetailsContext";
import { forwardRef } from "react";
import {
  getFullFileNo,
  useImporterInfo,
  formatCurrency,
  FILE_DUTY_ORDER,
} from "@repo/core";
import { format, parse } from "date-fns";

const PrintLayout = forwardRef<HTMLDivElement>((_, ref) => {
  const { year, fileNo, data, totals } = useFileDetailsContext();
  const importerInfo = useImporterInfo(data.importer);

  const dutyData = data.duty ?? {};

  const fallbackIndex = FILE_DUTY_ORDER.indexOf("ZZZ");
  const getDutyOrderIndex = (key: string) => {
    const index = FILE_DUTY_ORDER.indexOf(
      key as (typeof FILE_DUTY_ORDER)[number],
    );
    return index === -1 ? fallbackIndex : index;
  };

  const sortedDutyData = Object.entries(dutyData).sort(
    ([keyA], [keyB]) => getDutyOrderIndex(keyA) - getDutyOrderIndex(keyB),
  );

  const dutyRows = sortedDutyData.map(([key, value]) => {
    const label = key === "DF" ? "DF/VAT" : key;
    return {
      label: value.percentage ? `${label} - ${value.percentage}%` : label,
      value: value.value,
    };
  });

  const commission =
    totals?.commission && totals.commission > 2000 ? totals.commission : 2000;

  return (
    <div className="py-4 w-full overflow-y-auto">
      <div
        ref={ref}
        className="max-w-[210mm] mx-auto w-full text-xs border-2 print:border-0 border-primary border-dashed pt-8 pl-16 pr-8"
      >
        <table role="table" className="w-full table border-collapse">
          <tbody className="border-4 border-double border-foreground">
            <tr>
              <td colSpan={3}>
                <div className="flex items-center px-6 py-4 border-b-4 border-double border-foreground">
                  <div className="grow flex flex-col">
                    <div className="font-chandrabati text-5xl font-medium leading-6 mt-4">
                      Avn&mvb G›UvicÖvBR
                    </div>
                    <div className="text-[32px] font-semibold">
                      AHSAN ENTERPRISE
                    </div>
                    <div className="text-lg font-semibold">
                      IMPORT, EXPORT, INDENT, C&F
                    </div>
                    <div className="text-base leading-6">
                      Noor Mohal, Anandipur Gate, P.C. Road
                    </div>
                    <div className="text-base leading-6">
                      Halishahar, Chittagong
                    </div>
                  </div>
                  <div className="flex-wrap flex flex-row space-x-4 leading-5 text-sm">
                    <div className="flex-wrap">
                      Phone:
                      <br />
                      Mobile:
                      <br />
                      <br />
                      Fax:
                      <br />
                      E-Mail:
                    </div>
                    <div className="flex-wrap">
                      031-2511325
                      <br />
                      01711-748836
                      <br />
                      01611-748836
                      <br />
                      031-727038
                      <br />
                      rafije@gmail.com
                    </div>
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td colSpan={3}>
                <div className="p-2 space-y-1.5 border-b-4 border-double border-foreground">
                  <div className="flex space-x-1.5">
                    <div className="w-3/10 p-1 rounded-md border-2 border-foreground flex flex-col items-center justify-center text-center">
                      <div>{data.itemPackage}</div>
                      <div>{data.itemName}</div>
                      {data.lc && String(data?.lc) !== "0" ? (
                        <div>{`LC No. ${data.lc}`}</div>
                      ) : null}
                    </div>
                    <div className="w-2/5 py-2 px-1 rounded-md border-2 border-foreground text-center leading-4">
                      <h1 className="font-bold text-[26px] leading-8 uppercase">
                        {data.importer}
                      </h1>
                      <p>{importerInfo?.address1}</p>
                      <p>{importerInfo?.address2}</p>
                      {importerInfo?.address3 && (
                        <p>{importerInfo?.address3}</p>
                      )}
                    </div>
                    <div className="w-3/10 p-2 rounded-md border-2 border-foreground flex flex-col items-center justify-center text-[13px]">
                      <div className="flex flex-row  w-full space-x-2">
                        <div className="grow">BILL NO.</div>
                        <div className="flex-wrap">
                          {getFullFileNo(fileNo, year)}
                        </div>
                      </div>
                      {data?.deliveryDate && (
                        <div className="flex flex-row w-full space-x-2">
                          <div className="grow">DATE:</div>
                          <div className="flex-wrap">
                            {format(
                              parse(data.deliveryDate, "dd/MM/yy", new Date()),
                              "dd/MM/yyyy",
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-1.5">
                    {(data?.bl || data?.vessel || data?.rotNo) && (
                      <div className="w-3/10 p-2 flex flex-col items-center justify-center rounded-md border-2 border-foreground">
                        {data && data.vessel && <div>{data.vessel}</div>}
                        {data && data.rotNo && (
                          <div>{`ROT NO: ${data.rotNo}`}</div>
                        )}
                        {data && data.bl && <div>{`B/L: ${data.bl}`}</div>}
                      </div>
                    )}
                    {(data.be ||
                      data?.cnfValue ||
                      data?.assessableValue ||
                      data?.beDate) && (
                      <div className="w-2/5 p-2 flex flex-col items-center justify-center rounded-md border-2 border-foreground">
                        {data?.cnfValue && (
                          <div className="flex flex-row w-full space-x-2">
                            <div className="grow">C&F VALUE:</div>
                            <div className="flex-wrap">
                              $ {formatCurrency(data.cnfValue)}
                            </div>
                          </div>
                        )}
                        {data?.assessableValue && (
                          <div className="flex flex-row w-full space-x-2">
                            <div className="grow">ASSESSABLE VALUE:</div>
                            <div className="flex-wrap">
                              TK. {formatCurrency(data.assessableValue)}
                            </div>
                          </div>
                        )}
                        {data?.be && data.be !== 0 && data?.beDate ? (
                          <div className="flex flex-row w-full space-x-2">
                            <div className="grow">{`B/E No. C-${data.be}`}</div>
                            <div className="flex-wrap">{`DATE: ${data.beDate}`}</div>
                          </div>
                        ) : null}
                      </div>
                    )}
                    {(data?.assessmentDate ||
                      data?.dutyPaymentDate ||
                      data?.deliveryDate) && (
                      <div className="w-3/10 p-2 flex flex-col items-center justify-center rounded-md border-2 border-foreground">
                        {data?.assessmentDate && (
                          <div className="flex flex-row w-full space-x-1">
                            <div className="grow">ASSESSMENT:</div>
                            <div className="flex-wrap">
                              {data.assessmentDate}
                            </div>
                          </div>
                        )}
                        {data?.dutyPaymentDate && (
                          <div className="flex flex-row w-full space-x-1">
                            <div className="grow">DUTY PAYMENT:</div>
                            <div className="flex-wrap">
                              {data.dutyPaymentDate}
                            </div>
                          </div>
                        )}
                        {data?.deliveryDate && (
                          <div className="flex flex-row w-full space-x-1">
                            <div className="grow">DELIVERY:</div>
                            <div className="flex-wrap">{data.deliveryDate}</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </td>
            </tr>
            {dutyRows.length > 0 && (
              <tr>
                <td colSpan={3}>
                  <table className="w-full border-b-4 border-double border-foreground">
                    <tbody>
                      <tr>
                        <td className={`w-5/6 h-full text-[10px]`} colSpan={2}>
                          <div
                            className="grid items-center justify-center text-center"
                            style={{
                              gridTemplateColumns: `35px 60px repeat(${dutyRows.length}, minmax(0, 1fr))`,
                            }}
                          >
                            <div>Duty</div>
                            <div className="h-full flex flex-col items-center justify-center border-x border-foreground">
                              {data.dutyRef && data.dutyRef !== 0 ? (
                                <div>{`R-${data.dutyRef}`}</div>
                              ) : null}
                              {data.assessmentRef && data.assessmentRef != 0 ? (
                                <div>{`A-${data.assessmentRef}`}</div>
                              ) : null}
                            </div>
                            {dutyRows.map(({ label, value }, index) => (
                              <div
                                key={index}
                                className="border-r border-foreground h-full flex flex-col items-center justify-center"
                              >
                                <div className="w-full py-1 border-b border-foreground">
                                  {label}
                                </div>
                                <div className="py-1">
                                  TK. {formatCurrency(value)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="w-1/6 p-1">
                          {data.dutyPaid && (
                            <div className="text-center">{data.dutyPaid}</div>
                          )}
                          <div className="flex">
                            <div className="flex-1">TK.</div>
                            {formatCurrency(totals.duty)}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            )}
            <PrintExpenseRow expenseData={data.port} total={totals.port} />
            <PrintExpenseRow expenseData={data.custom} total={totals.custom} />
            <PrintExpenseRow
              expenseData={data.delivery}
              total={totals.delivery}
            />
            <PrintSingleExpenseRow
              details="Automation, Photo Copy, Conveyance, Courier, Document, Bank"
              value={data?.miscellaneous ?? 0}
            />
            <PrintSingleExpenseRow
              details={`Agency Commission ${commission === 2000 ? "(Minimum)" : ""}`}
              value={commission}
            />
            <tr>
              <td colSpan={3}>
                <div className="flex">
                  <div className="w-2/3 py-2 pl-6 pr-2 items-center">
                    <pre className="w-full font-sans">
                      {data?.remarks ?? null}
                    </pre>
                  </div>
                  <div className="w-1/6 border-x border-foreground">
                    <div className="px-1.5 py-1">TOTAL</div>
                    <div className="px-1.5 py-1 border-y border-foreground">
                      PAID
                    </div>
                    <div className="px-1.5 py-1">BALANCE</div>
                  </div>
                  <div className="w-1/6">
                    <div className="flex px-2 py-1">
                      <div className="flex-1">TK.</div>
                      <div>{formatCurrency(totals.grandTotal)}</div>
                    </div>
                    <div className="flex px-2 py-1 border-y border-foreground">
                      <div className="flex-1">TK.</div>
                      <div>{formatCurrency(totals.paid)}</div>
                    </div>
                    <div className="flex px-2 py-1">
                      <div className="flex-1">TK.</div>
                      <div>{formatCurrency(totals.balance)}</div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex flex-col space-y-8 text-end py-4 pr-8">
          <div>Ahsan Enterprise</div>
          <div>Proprietor</div>
        </div>
      </div>
    </div>
  );
});

export default PrintLayout;

const PrintExpenseRow = ({
  expenseData,
  total,
}: {
  expenseData?: Record<string, { details: string; value: number }>;
  total?: number;
}) => {
  if (!expenseData || Object.keys(expenseData).length === 0) return null;
  return (
    <tr>
      <td colSpan={3} className="p-0">
        <table className="w-full border-b-4 border-double border-foreground">
          <tbody>
            {Object.entries(expenseData).map(([key, value], index) => (
              <tr key={key}>
                <td
                  className={`w-2/3 pl-6 pr-2 align-top ${
                    index === 0 ? "pt-2" : ""
                  } ${index === Object.keys(expenseData).length - 1 ? "pb-2" : ""}`}
                >
                  {value.details}
                </td>

                <td
                  className={`w-1/6 px-1.5 border-x border-foreground ${
                    Object.keys(expenseData).length == 1 ? "" : "align-top"
                  } ${index === 0 ? "pt-2" : ""} ${
                    index === Object.keys(expenseData).length - 1 ? "pb-2" : ""
                  }`}
                >
                  <div className="flex">
                    <div className="flex-1">TK.</div>
                    {formatCurrency(value.value)}
                  </div>
                </td>

                {index === 0 && (
                  <td
                    className="w-1/6 px-1.5 py-2"
                    rowSpan={Object.keys(expenseData).length}
                  >
                    <div className="flex">
                      <div className="flex-1">TK.</div>
                      <div>{formatCurrency(total)}</div>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </td>
    </tr>
  );
};

const PrintSingleExpenseRow = ({
  details,
  value,
}: {
  details: string;
  value: number;
}) => {
  return (
    <tr>
      <td colSpan={3} className="p-0">
        <table className="w-full border-b-4 border-double border-foreground">
          <tbody>
            <tr>
              <td className="w-2/3 pl-6 pr-2 align-top pt-2 pb-2">{details}</td>
              <td className="w-1/6 px-1.5 border-x border-foreground align-top pt-2 pb-2">
                <div className="flex">
                  <div className="flex-1">TK.</div>
                  {formatCurrency(value)}
                </div>
              </td>
              <td className="w-1/6 px-1.5 py-2">
                <div className="flex">
                  <div className="flex-1">TK.</div>
                  <div>{formatCurrency(value)}</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
};
