"use client";
import React from 'react'
import dynamic from "next/dynamic";

const PdfToHtmlConverter = dynamic(
  () => import("../PdfToHtmlConverter"),
  { ssr: false } // disables server-side rendering
);

const page = () => {
  return (
   <>
   <PdfToHtmlConverter/>
   
   </>
  )
}

export default page