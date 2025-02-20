import React, { ReactNode } from "react";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { api } from "@/redux/api";

const ReduxProviders = ({ children }: { children: ReactNode }) => {
  return <ApiProvider api={api}>{children}</ApiProvider>;
};

export default ReduxProviders;
