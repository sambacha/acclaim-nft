/**
 * SPDX-License-Identifier: Apache-2.0
 */
import AuthForm from "../../../components/AuthForm";
import React from "react";
import ResourceLinks from "gatsby-theme-carbon/src/components/LeftNav/ResourceLinks";

const links = [
  {
    title: "GitHub",
    href: "https://github.com/sambacha/nft-badges",
  },
  {
    title: "Optinos",
    href: "https://www.optino.xyz",
  },
];

const CustomResources = () => {
  return (
    <>
      <AuthForm />
      <ResourceLinks shouldOpenNewTabs links={links} />
    </>
  );
};

export default CustomResources;
