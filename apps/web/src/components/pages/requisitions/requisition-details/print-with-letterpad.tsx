async function fetchImageAsBase64(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`Failed to fetch letterpad: ${response.status}`);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function escapeHtml(value: unknown) {
  const text = value == null ? "" : String(value);

  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

import { Button } from "@repo/ui";
import { FaPrint } from "react-icons/fa6";
import type { RequisitionExpense } from "./expense-section";
import { useRequisitionDetailsContext } from "@/contexts/RequisitionDetailsContext";

export default function PrintWithLetterpad() {
  const { expenses, requisitionRef, date, lcs } =
    useRequisitionDetailsContext();
  const { letter, arrival, delivery } = date;

  const handlePrintLetterPad = async () => {
    try {
      const letterpadUri = await fetchImageAsBase64(
        "/letterpad-compressed.jpg",
      );
      const expenseRows = expenses
        .map((row) => {
          const total =
            (row.duty ?? 0) +
            (row.port ?? 0) +
            (row.section ?? 0) +
            (row.noc ?? 0) +
            (row.assessment ?? 0) +
            (row.labour ?? 0) +
            (row.examine ?? 0) +
            (row.truck ?? 0);

          return `
            <tr>
              <td>${escapeHtml(row.fileNo)}</td>
              <td>${escapeHtml(row.itemName ?? "N/A")}</td>
              <td>${escapeHtml(row.lc ?? "-")}</td>
              <td style="text-align:right;">${total.toLocaleString()}</td>
            </tr>
          `;
        })
        .join("");

      const htmlBody = `
      <div class="header-space"></div>
      <div class="page-wrap">
        <div class="meta-row">
          <div><strong>Ref:</strong> ${escapeHtml(requisitionRef)}</div>
          <div><strong>Date:</strong> ${escapeHtml(letter ?? "-")}</div>
        </div>

        <p>
          Mr. Saiful Islam<br />
          Manager Supply Chain<br />
          Bio Pharma Ltd.
        </p>

        <p>
          <strong>Subject:</strong> Payment Request for Customs Clearance and Delivery for L/C Nos. ${escapeHtml(
            lcs && lcs.length > 0 ? lcs.join(", ") : "-",
          )}
        </p>

        <p>Dear Sir,</p>
        <p>Assalamualikum Wrt. Wbr.</p>
        <p>
          We are pleased to inform you that the subject consignments arrived at Chittagong Port on
          <strong>${escapeHtml(arrival ?? "-")}</strong>.
        </p>
        <p>
          The customs assessment has been finalized, and we have scheduled the delivery for
          <strong>${escapeHtml(delivery ?? "-")}</strong>. To facilitate a timely release of the goods,
          we kindly request you to deposit the Duty, Port, Agency, Labor and other charges to our
          bank account as per the details below:
        </p>

        <table>
          <tbody>
            <tr>
              <td style="width: 28mm;">
                <strong>Account Name</strong>
              </td>
              <td>: AHSAN ENTERPRISE</td>
            </tr>
            <tr>
              <td>
                <strong>Account No</strong>
              </td>
              <td>: 20501030100151503 (Current Account)</td>
            </tr>
            <tr>
              <td>
                <strong>Bank</strong>
              </td>
              <td>: Islami Bank Bangladesh Ltd (IBBL)</td>
            </tr>
            <tr>
              <td>
                <strong>Branch</strong>
              </td>
              <td>: Agrabad Branch, Chattogram</td>
            </tr>
          </tbody>
        </table>

        <table style="width: 100%;margin: 4mm 0 4mm;">
          <thead>
            <tr>
              <th>File No</th>
              <th>Item Name</th>
              <th>L/C No</th>
              <th style="text-align:right;">Total</th>
            </tr>
          </thead>
          <tbody>${expenseRows}</tbody>
        </table>

        <p>
          Please confirm with the deposit slip or confirmation at your earliest convenience to avoid
          any delay or port demurrage.
        </p>
        <p>Thank you for your cooperation.</p>
      </div>
      <div class="footer-space"></div>
      `;

      const html = `<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="UTF-8" />
    <title>Transaction Statement</title>
    <style>
        /*
        * @page margins push content away from the letterpad header/footer on
        * EVERY page (not just the first). Zero side margins so the letterpad
        * background fills edge-to-edge horizontally.
        */
        @page { size: 210mm 288mm; portrait; margin: 0; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { font-family: Arial, Helvetica, sans-serif; color: #222; }

        html::before {
            content: '';
            position: fixed;
            inset: 0;
            width: 210mm;
            height: 288mm;
            background-image: url('${letterpadUri}');
            background-size: cover;
            background-repeat: no-repeat;
            z-index: -1;
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
        }

        .header-space { height: 55mm; }
        .footer-space { height: 14mm; }
        .page-wrap { width: 100%; padding: 0 14mm; }
        .meta-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8mm;
          font-size: 12px;
        }
        p { margin-bottom: 4mm; line-height: 1.5; font-size: 13px; }

        table {
          border-collapse: collapse;
          font-size: 12px;
        }
        th, td {
          padding: 1mm;
          vertical-align: top;
        }
        th {
          text-align: left;
        }

        @media print {
        * { print-color-adjust: exact !important; -webkit-print-color-adjust: exact !important; }
        }
    </style>
    </head>
    <body>${htmlBody}</body></html>`;

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
      label={"Print with Letterpad"}
      Icon={<FaPrint />}
      className="max-w-40 w-full space-x-1"
      onClick={handlePrintLetterPad}
    />
  );
}
