import React from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

interface PDFProps {
  targetId: string // The DOM element id to capture (e.g., 'resume-content')
}

export default function ResumePDF({ targetId }: PDFProps) {
const downloadPDF = async () => {
  const el = document.getElementById(targetId);
  if (!el) return;

  el.classList.add('pdf-safe');
  const canvas = await html2canvas(el, { scale: 2 });
  el.classList.remove('pdf-safe');

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const w = pdf.internal.pageSize.getWidth();
  const h = (canvas.height * w) / canvas.width;
  pdf.addImage(imgData, 'PNG', 0, 0, w, h);
  pdf.save('resume.pdf');
};


  return (
    <button
      onClick={downloadPDF}
      className="mt-4 bg-purple-600 hover:bg-purple-800 text-white px-4 py-2 rounded  transition"
    >
      Download PDF
    </button>
  )
}
