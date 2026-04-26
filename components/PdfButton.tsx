"use client";

import { useState } from "react";
import type { Game } from "@/lib/types";

export function PdfButton({ game }: { game: Game }) {
  const [busy, setBusy] = useState(false);

  async function generate() {
    setBusy(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "pt", format: "letter" });
      const PW = 612,
        PH = 792;
      const ML = 48,
        MR = 48,
        MT = 52,
        MB = 48;
      const CW = PW - ML - MR;
      const TEAL: [number, number, number] = [15, 110, 86];
      const AMBER: [number, number, number] = [186, 117, 23];
      const WHITE: [number, number, number] = [255, 255, 255];
      const LIGHT: [number, number, number] = [245, 252, 249];
      const GRAY: [number, number, number] = [95, 94, 90];
      const LGRAY: [number, number, number] = [241, 239, 232];
      const DARK: [number, number, number] = [44, 44, 42];

      let y = MT;

      // Header banner
      doc.setFillColor(...TEAL);
      doc.rect(0, 0, PW, 90, "F");

      doc.setFillColor(...AMBER);
      doc.roundedRect(ML, y, 160, 22, 11, 11, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(...WHITE);
      doc.text(
        "STEM ACTIVITY SHEET  •  fromboardstobeakers.com",
        ML + 10,
        y + 14.5
      );

      y += 32;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(...WHITE);
      doc.text(game.name, ML, y);

      y += 18;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(225, 245, 238);
      const metaLine = `${game.stem}  •  ${game.type}  •  Ages ${game.age}  •  ${game.time}  •  ${game.players} players`;
      doc.text(metaLine, ML, y);

      y = 106;

      // STEM connection box
      const detailLines = doc.splitTextToSize(game.detail, CW - 20);
      doc.setFillColor(...LIGHT);
      doc.setDrawColor(...TEAL);
      doc.setLineWidth(1.5);
      doc.roundedRect(
        ML,
        y,
        CW,
        10 + detailLines.length * 13 + 14,
        6,
        6,
        "FD"
      );
      y += 14;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(...TEAL);
      doc.text("STEM CONNECTION", ML + 10, y);
      y += 12;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(...DARK);
      doc.text(detailLines, ML + 10, y);
      y += detailLines.length * 13 + 16;

      function sectionHeader(label: string) {
        doc.setFillColor(...TEAL);
        doc.rect(ML, y, 3, 14, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(...TEAL);
        doc.text(label, ML + 9, y + 10);
        y += 20;
      }

      function checkPage(needed: number) {
        if (y + needed > PH - MB) {
          doc.addPage();
          doc.setFillColor(...TEAL);
          doc.rect(0, 0, PW, 28, "F");
          doc.setFont("helvetica", "bold");
          doc.setFontSize(8);
          doc.setTextColor(...WHITE);
          doc.text(
            `${game.name} — STEM Activity Sheet (continued)`,
            ML,
            18
          );
          y = 44;
        }
      }

      sectionHeader("KEY SCIENCE CONCEPTS");
      const chipW = 85,
        chipH = 18,
        chipGap = 8;
      let cx = ML;
      game.concepts.forEach((c) => {
        if (cx + chipW > ML + CW) {
          cx = ML;
          y += chipH + 4;
        }
        doc.setFillColor(225, 245, 238);
        doc.roundedRect(cx, y - 13, chipW, chipH, 9, 9, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.5);
        doc.setTextColor(...TEAL);
        const ct = doc.splitTextToSize(c, chipW - 12);
        doc.text(ct[0], cx + 6, y - 13 + 11);
        cx += chipW + chipGap;
      });
      y += chipH + 10;

      checkPage(30);
      sectionHeader("DID YOU KNOW? FAST FACTS");
      game.facts.forEach((f) => {
        const lines = doc.splitTextToSize(f, CW - 22);
        checkPage(lines.length * 13 + 8);
        doc.setFillColor(...AMBER);
        doc.circle(ML + 5, y - 3, 2.5, "F");
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9.5);
        doc.setTextColor(...DARK);
        doc.text(lines, ML + 14, y);
        y += lines.length * 13 + 5;
      });
      y += 6;

      checkPage(40);
      sectionHeader("AT-HOME LAB ACTIVITIES");
      game.exps.forEach((exp, ei) => {
        const expH = 20;
        checkPage(expH + 20);
        doc.setFillColor(...TEAL);
        doc.roundedRect(ML, y, CW, expH, 5, 5, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9.5);
        doc.setTextColor(...WHITE);
        doc.text(`Lab ${ei + 1}: ${exp.t}`, ML + 10, y + 13);
        y += expH + 8;

        exp.s.forEach((step, si) => {
          const slines = doc.splitTextToSize(step, CW - 30);
          checkPage(slines.length * 13 + 8);
          doc.setFillColor(...AMBER);
          doc.roundedRect(ML, y - 11, 16, 13, 6, 6, "F");
          doc.setFont("helvetica", "bold");
          doc.setFontSize(7.5);
          doc.setTextColor(...WHITE);
          doc.text(String(si + 1), ML + 5.5, y - 2);
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9.5);
          doc.setTextColor(...DARK);
          doc.text(slines, ML + 22, y);
          y += slines.length * 13 + 6;
        });

        const wlines = doc.splitTextToSize("Why it works: " + exp.w, CW - 24);
        checkPage(wlines.length * 13 + 16);
        doc.setFillColor(250, 238, 218);
        doc.roundedRect(ML, y, CW, wlines.length * 13 + 14, 5, 5, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        doc.setTextColor(...AMBER);
        doc.text("🔬 ", ML + 8, y + 11);
        doc.setFont("helvetica", "bolditalic");
        doc.setFontSize(8.5);
        doc.text("Why it works:", ML + 18, y + 11);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(...DARK);
        const wbody = doc.splitTextToSize(exp.w, CW - 30);
        doc.text(wbody, ML + 8, y + 24);
        y += wlines.length * 13 + 22;
      });
      y += 6;

      checkPage(40);
      sectionHeader("RECOMMENDED READING");
      game.books.forEach((b) => {
        const titleLines = doc.splitTextToSize(b.t, CW - 22);
        const descLines = doc.splitTextToSize(b.d, CW - 22);
        const blockH = titleLines.length * 12 + descLines.length * 11 + 30;
        checkPage(blockH);

        doc.setFillColor(...LGRAY);
        doc.roundedRect(ML, y, CW, blockH - 4, 5, 5, "F");
        doc.setFillColor(...TEAL);
        doc.rect(ML, y, 4, blockH - 4, "F");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(9.5);
        doc.setTextColor(...DARK);
        doc.text(titleLines, ML + 12, y + 12);
        const ty = y + 12 + titleLines.length * 12;
        doc.setFont("helvetica", "italic");
        doc.setFontSize(8.5);
        doc.setTextColor(...GRAY);
        doc.text(`by ${b.a}`, ML + 12, ty);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(...DARK);
        doc.text(descLines, ML + 12, ty + 13);
        doc.setFillColor(...AMBER);
        const agW = doc.getTextWidth(b.ag) + 12;
        doc.roundedRect(
          ML + 12,
          ty + descLines.length * 11 + 14,
          agW,
          13,
          6,
          6,
          "F"
        );
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7);
        doc.setTextColor(...WHITE);
        doc.text(b.ag, ML + 18, ty + descLines.length * 11 + 23);
        y += blockH + 6;
      });

      const totalPages = doc.getNumberOfPages();
      for (let p = 1; p <= totalPages; p++) {
        doc.setPage(p);
        doc.setFillColor(...LGRAY);
        doc.rect(0, PH - 28, PW, 28, "F");
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        doc.setTextColor(...GRAY);
        doc.text(
          "From Boards to Beakers  •  Free STEM resources for game-based learning  •  fromboardstobeakers.com",
          ML,
          PH - 12
        );
        doc.text(`Page ${p} of ${totalPages}`, PW - MR, PH - 12, {
          align: "right",
        });
      }

      const fname =
        game.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") +
        "-stem-activity-sheet.pdf";
      doc.save(fname);
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={generate}
      disabled={busy}
      className="bg-teal text-white border-none px-5 py-2.5 rounded-[10px] font-display font-extrabold text-[0.88rem] cursor-pointer hover:bg-teal-dark disabled:opacity-60"
    >
      {busy ? "Generating…" : "⬇ Download Activity Sheet PDF"}
    </button>
  );
}
