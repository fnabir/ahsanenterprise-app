import { Button } from "@repo/ui";
import { FaPrint } from "react-icons/fa6";
import { useRequisitionDetailsContext } from "@/contexts/RequisitionDetailsContext";
import { shouldShowRow } from "./expense-section";
import { formatCurrency, REQUISITION_EXPENSE_FIELDS } from "@repo/core";
import { RequisitionDetails } from "@repo/types";
import { LETTERPAD_URI_BASE64 } from "./letterpad";

export default function PrintButton({ letterpad }: { letterpad: boolean }) {
  const {
    expenses,
    requisitionRef,
    date,
    lcsString,
    subtotalPerFile,
    total,
    fileCount,
  } = useRequisitionDetailsContext();
  const { letter, arrival, delivery } = date;

  const handlePrintLetterPad = async () => {
    try {
      const letterpadUri = letterpad ? LETTERPAD_URI_BASE64 : "";

      console.log("letterpadUri:", letterpadUri);

      const expenseRows = REQUISITION_EXPENSE_FIELDS.map(({ label, key }) => {
        if (!shouldShowRow(key as keyof RequisitionDetails, expenses)) {
          return null;
        }

        return `
        <tr>
          <th>
            ${label}
          </th>

        ${expenses
          .map((expense) => {
            const value = expense[key as keyof RequisitionDetails];
            const isCurrency =
              REQUISITION_EXPENSE_FIELDS.find((field) => field.key === key)
                ?.isCurrency && typeof value === "number";

            return `
              <td style="text-align: center;">
                ${
                  isCurrency
                    ? `
                      <div class="currency">
                        <span>TK.</span>
                        <span>${formatCurrency(value ?? 0)}</span>
                      </div>
                    `
                    : (value ?? "—")
                }
              </td>
            `;
          })
          .join("")}
      </tr>
    `;
      })
        .filter(Boolean)
        .join("");

      const subtotalRows = `
      <tr>
        <th style="font-weight:bold;">Subtotal</th>
        ${subtotalPerFile
          .map(
            (subtotal) => `
          <td>
            <div class="currency">
              <span>TK.</span>
              <span>${formatCurrency(subtotal)}</span>
            </div>
          </td>
        `,
          )
          .join("")}
      </tr>
      `;

      const totalRows = `
      <tr style="font-weight:bold;">
        <th>Total</th>
        ${Array(fileCount - 1)
          .fill(`<td style="border: 0; border-bottom: 1px solid black;"/>`)
          .join("")}
        <td style="border-left: 0;">
          <div class="currency">
            <span>TK.</span>
            <span>${formatCurrency(total)}</span>
          </div>
        </td>
      </tr>
      `;

      const htmlBody = `
      <div class="meta-row">
        <div><strong>Ref:</strong> ${requisitionRef}</div>
        <div><strong>Date:</strong> ${letter ?? "-"}</div>
      </div>

      <p>
        Mr. Saiful Islam<br />
        Manager Supply Chain<br />
        Bio Pharma Ltd.
      </p>

      <p>
        <strong>Subject:</strong> Payment Request for Customs Clearance and Delivery for L/C Nos. ${lcsString}.
      </p>

      <p>Dear Sir,</p>
      <p>Assalamualikum Wrt. Wbr.</p>
      <p>
        We are pleased to inform you that the subject consignments arrived at Chittagong Port on
        <strong>${arrival ?? "-"}</strong>.
      </p>
      <p>
        The customs assessment has been finalized, and we have scheduled the delivery for
        <strong>${delivery ?? "-"}</strong>. To facilitate a timely release of the goods,
        we kindly request you to deposit the Duty, Port, Agency, Labor and other charges to our
        bank account as per the details below:
      </p>

      <table class="content-table">
        <tbody>
          <tr><td style="width: 28mm;"><strong>Account Name</strong></td><td>: AHSAN ENTERPRISE</td></tr>
          <tr><td><strong>Account No</strong></td><td>: 20501030100151503 (Current Account)</td></tr>
          <tr><td><strong>Bank</strong></td><td>: Islami Bank Bangladesh Ltd (IBBL)</td></tr>
          <tr><td><strong>Branch</strong></td><td>: Agrabad Branch, Chattogram</td></tr>
        </tbody>
      </table>

      <table class="content-table expense-table">
        <tbody>
          ${expenseRows}
          ${subtotalRows}
          ${totalRows}
        </tbody>
      </table>

      <p>
        Please confirm with the deposit slip or confirmation at your earliest convenience to avoid
        any delay or port demurrage.
      </p>
      <p>Thank you for your cooperation.</p>
    `;

      const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>${requisitionRef}</title>
          <style>
            @page { size: 210mm 288mm; margin: 0; }
            * { margin: 0; padding: 0; box-sizing: border-box; }
            html, body { font-family: Arial, Helvetica, sans-serif; color: #222; }

            html::before {
              content: '';
              position: fixed;
              top: 0; left: 0;
              width: 100%;
              height: 100%;
              ${letterpad ? `background-image: url('${letterpadUri}');` : ""}
              background-size: cover;
              background-repeat: no-repeat;
              z-index: -1;
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }

            .expense-table { width: 100%; margin: 4mm 0 4mm; }
            .expense-table tbody th, .expense-table tbody td { border: 1px solid black}

            .meta-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 6mm;
              font-size: 12px;
            }
            p { margin-bottom: 2mm; line-height: 1.5; font-size: 13px; }

            table.content-table { border-collapse: collapse; font-size: 12px; }
            th, td { padding: 1mm; }
            th { text-align: left; }
            .currency { display: flex; justify-content: space-between; width: 100%; }

            tr { break-inside: avoid; }

            @media print {
              * { print-color-adjust: exact !important; -webkit-print-color-adjust: exact !important; }
            }
          </style>
        </head>
        <body>
          <table style="width: 178mm; border-collapse: collapse; margin: 0 16mm;">
            <thead style="height: 52mm;"><tr><td></td></tr></thead>
            <tfoot style="height: 16mm;"><tr><td></td></tr></tfoot>
            <tbody>
              <tr><td>${htmlBody}</td></tr>
            </tbody>
          </table>
        </body>
      </html>`;

      const iframe = document.createElement("iframe");
      iframe.style.cssText =
        "position:fixed;width:0;height:0;border:none;visibility:hidden;";
      document.body.appendChild(iframe);

      const doc = iframe.contentDocument!;
      doc.open();
      doc.write(html);
      doc.close();

      // Wait for the iframe to fully load (CSS backgrounds, fonts, etc.)
      await new Promise<void>((resolve) => {
        if (iframe.contentDocument?.readyState === "complete") {
          resolve();
        } else {
          iframe.onload = () => resolve();
        }
      });

      iframe.contentWindow!.focus();
      iframe.contentWindow!.print();

      // Clean up after the print dialog closes
      const cleanup = () => {
        if (document.body.contains(iframe)) document.body.removeChild(iframe);
      };
      iframe.contentWindow!.addEventListener("afterprint", cleanup, {
        once: true,
      });
      // Fallback cleanup in case afterprint doesn't fire
      setTimeout(cleanup, 3000);
    } catch (error) {
      console.error("Print failed:", error);
    }
  };

  return (
    <Button
      label={letterpad ? "Print with Letterpad" : "Print"}
      Icon={<FaPrint />}
      className={`${letterpad ? "max-w-48" : "max-w-24"} w-full space-x-1`}
      onClick={handlePrintLetterPad}
    />
  );
}
