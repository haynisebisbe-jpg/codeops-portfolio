"use client";

import CategoryBar from "./CategoryBar";

export default function FilterShell({ children, categories }) {
  return (
    <>
      <CategoryBar categories={categories} />
      {children}
    </>
  );
}
