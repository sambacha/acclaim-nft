
/**
 * SPDX-License-Identifier: Apache-2.0
 */import {
  Button,
  Dropdown,
  InlineLoading,
  InlineNotification,
  SkeletonText,
  TextArea,
} from "carbon-components-react";
import { Column, Row } from "gatsby-theme-carbon";
import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";

import { H2 } from "gatsby-theme-carbon/src/components/markdown";
import badgeConfig from "../../../config/badges";
import style from "./BadgeForm.module.scss";
import { useAuth } from "../../util/hooks/use-auth.js";

const cleanPRs = (prs) => {
  return prs.map((pr) => {
    const { number, state, title, html_url } = pr;

    const approved = pr.labels.reduce((approved, label) => {
      if (label.name === "status: approved") {
        approved = true;
      }
      return approved;
    }, false);

    const correction = pr.labels.reduce((correction, label) => {
      if (label.name === "status: needs correction") {
        correction = true;
      }
      return correction;
    }, false);

    const step = title.toLowerCase().match(/step \d/gi);

    return {
      number,
      state,
      status: approved
        ? "approved"
        : correction
        ? "correction"
        : "not-reviewed",
      step: step ? step[0] : "",
      url: html_url,
    };
  });
};

const BadgeForm = () => {
  const [emails, setEmails] = useState([]);
  const [steps, setSteps] = useState([]);
  const [stepsLoading, setStepsLoading] = useState(false);
  const { token } = useAuth();
  const {
    handleSubmit,
    watch,
    errors,
    control,
    formState,
    setError,
    clearErrors,
    register,
  } = useForm({
    mode: "onChange",
  });
  const selectedTutorial = watch("badge", {});

  useEffect(() => {
    if (!token) return;

    fetch(`/api/github/user-emails?access_token=${token}`)
      .then((response) => response.json())
      .then((data) => {
        setEmails(data || []);
      });
  }, [token]);

  useEffect(() => {
    if (!selectedTutorial.id) {
      return;
    }

    const preSetSteps = (prs) => {
      // filter PRs by "step x" title and sort by step then status (approved
      // first, then needs correction, then not reviewed)
      const items = cleanPRs(prs)
        .filter((item) => item.step)
        .sort((a, b) => {
          if (a.step < b.step) return -1;
          if (a.step > b.step) return 1;
          if (a.status < b.status) return -1;
          if (a.status > b.status) return 1;
          return 0;
        });

      // grab the first PR for each step and backfill missing steps
      const uniqueItems = [];
      for (let i = 1; i <= 5; i++) {
        const foundItem = items.find((item) => item.step.includes(i));
        if (foundItem) {
          uniqueItems.push(foundItem);
        } else {
          uniqueItems.push({
            status: "not-found",
            step: "Step " + i,
          });
        }
      }

      const hasError = uniqueItems.reduce((error, item) => {
        return error ? true : item.status !== "approved";
      }, false);

      if (hasError) {
        setError("badge", {
          type: "manual",
          message: "A pull request for each step 1 - 5 must be approved.",
        });
      } else {
        clearErrors("badge");
      }

      setSteps(uniqueItems);
    };

    setSteps([]);
    setStepsLoading(true);

    fetch(
      `/api/github/pull-requests?access_token=${token}&tutorial=${selectedTutorial.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        preSetSteps(data.items || []);
        setStepsLoading(false);
      });
  }, [clearErrors, selectedTutorial, setError, token]);

  const onSubmit = (values) => alert(JSON.stringify(values, null, 2));

  if (!token) return null;

  return (
    <>
      <Row>
        <Column colLg={8}>
          <H2>Badge application</H2>
        </Column>
      </Row>
      <Row>
        <Column colLg={8}>
          {emails.length === 0 ? (
            <SkeletonText paragraph={true} width="320px" />
          ) : (
            <form method="post" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Controller
                  control={control}
                  name="badge"
                  rules={{ required: true }}
                  render={({ onChange, value }) => (
                    <Dropdown
                      id="badge"
                      invalid={!!errors.badge && !stepsLoading}
                      selectedItem={value}
                      onChange={(item) => onChange(item.selectedItem)}
                      invalidText={
                        (errors.badge && errors.badge.message) ||
                        "A value is required."
                      }
                      ariaLabel="Badge dropdown"
                      titleText="Carbon tutorial"
                      label="Choose a badge"
                      items={Object.keys(badgeConfig).map((name) => {
                        return {
                          id: name,
                          text: badgeConfig[name].label,
                        };
                      })}
                      itemToString={(item) => (item ? item.text : "")}
                      light={true}
                    />
                  )}
                />
              </div>

              <div className={style.field}>
                {stepsLoading && (
                  <InlineLoading
                    description="Searching GitHub..."
                    iconDescription="Searching GitHub"
                    status="active"
                  />
                )}
                {steps.map((step, i) => (
                  <InlineNotification
                    key={i}
                    hideCloseButton={true}
                    kind={
                      step.status === "approved"
                        ? "success"
                        : step.status === "correction"
                        ? "error"
                        : "warning"
                    }
                    lowContrast={true}
                    title={
                      step.step.charAt(0).toUpperCase() + step.step.slice(1)
                    }
                    subtitle={
                      <span>
                        {step.number && (
                          <>
                            <a href={step.url} rel="noreferrer" target="_blank">
                              PR #{step.number}
                            </a>{" "}
                          </>
                        )}
                        {step.status === "approved"
                          ? "approved."
                          : step.status === "correction"
                          ? "needs correction."
                          : step.status === "not-reviewed"
                          ? "not reviewed."
                          : "not found."}
                      </span>
                    }
                  ></InlineNotification>
                ))}
              </div>

              <div className={style.field}>
                <Controller
                  control={control}
                  name="email"
                  rules={{ required: true }}
                  render={({ onChange, value }) => (
                    <Dropdown
                      id="email"
                      invalid={!!errors.email}
                      selectedItem={value}
                      onChange={(item) => onChange(item.selectedItem)}
                      invalidText="A value is required."
                      ariaLabel="Email dropdown"
                      titleText="Email address"
                      label="Choose an email address"
                      helperText="Don't see your work email address? Verify it in GitHub email settings to use here."
                      items={emails
                        .filter((email) => email.verified)
                        .map((email) => email.email)}
                      light={true}
                    />
                  )}
                />
              </div>

              <div className={style.field}>
                <TextArea
                  id="questionHowDescribe"
                  name="questionHowDescribe"
                  invalid={!!errors.questionHowDescribe}
                  invalidText="A value is required."
                  labelText="How would you describe the tutorial in one or more words? (Optional)"
                  rows={3}
                  light={true}
                  disabled={!formState.isValid}
                  ref={register}
                />
              </div>

              <div className={style.field}>
                <TextArea
                  id="questionLikeBest"
                  name="questionLikeBest"
                  invalid={!!errors.questionLikeBest}
                  invalidText="A value is required."
                  labelText="What did you like best about the tutorial? (Optional)"
                  rows={3}
                  light={true}
                  disabled={!formState.isValid}
                  ref={register}
                />
              </div>

              <div className={style.field}>
                <TextArea
                  id="questionHowImprove"
                  name="questionHowImprove"
                  invalid={!!errors.questionHowImprove}
                  invalidText="A value is required."
                  labelText="How can we improve the tutorial? (Optional)"
                  rows={3}
                  light={true}
                  disabled={!formState.isValid}
                  ref={register}
                />
              </div>

              <div className={style.field}>
                <TextArea
                  id="questionSuggestion"
                  name="questionSuggestion"
                  invalid={!!errors.questionSuggestion}
                  invalidText="A value is required."
                  labelText="Anything you'd like help with going forward? Future tutorial topics? (Optional)"
                  rows={3}
                  light={true}
                  disabled={!formState.isValid}
                  ref={register}
                />
              </div>

              <div className={style.field}>
                <TextArea
                  id="questionFreeform"
                  name="questionFreeform"
                  invalidText="A value is required."
                  labelText="Anything else you'd like to share with the Carbon team? (Optional)"
                  rows={3}
                  light={true}
                  disabled={!formState.isValid}
                  ref={register}
                />
              </div>

              <Button
                className={style.button}
                disabled={!formState.isValid}
                size="field"
                type="submit"
              >
                Apply for badge
              </Button>
            </form>
          )}
        </Column>
      </Row>
    </>
  );
};

export default BadgeForm;
