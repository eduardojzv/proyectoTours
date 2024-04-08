import React from "react";
import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <Spinner size="lg" className="absolute top-[50%] left-[50%] translate translate-y-[-50%] translate-x-[-50%]" label="Loading..." color="warning" />
  );
}