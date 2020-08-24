/**
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useEffect } from "react";

import style from "./authorizing.module.scss";
import { useAuth } from "../util/hooks/use-auth.js";

const Authorizing = ({ location }) => {
  const { authorize } = useAuth();

  useEffect(() => {
    authorize(location);
  }, [authorize, location]);

  return <p className={style.copy}>Authorizing with GitHub, please wait...</p>;
};

export default Authorizing;
