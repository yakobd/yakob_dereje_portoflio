"use client";

import { useRef, useState, type FormEvent } from "react";
import {
  limits,
  validateContact,
  type ContactErrors,
  type ContactInput,
} from "@/lib/contact";
import Button from "./ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

const fields: {
  name: keyof ContactInput;
  label: string;
  type?: string;
  autoComplete: string;
}[] = [
  { name: "name", label: "Name", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "message", label: "Message", autoComplete: "off" },
];

const inputClasses =
  "mt-2 block w-full rounded-xl border bg-surface px-4 py-3 text-base text-foreground placeholder:text-subtle transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent";

export default function ContactForm() {
  const [values, setValues] = useState<ContactInput>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  function focusFirstError(fieldErrors: ContactErrors) {
    const first = fields.find((field) => fieldErrors[field.name]);
    if (first)
      formRef.current
        ?.querySelector<HTMLElement>(`#contact-${first.name}`)
        ?.focus();
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const fieldErrors = validateContact(values);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      focusFirstError(fieldErrors);
      return;
    }

    setStatus("submitting");
    setFormError("");
    const website =
      formRef.current?.querySelector<HTMLInputElement>("[name=website]")
        ?.value ?? "";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (result.fields) {
          setErrors(result.fields);
          focusFirstError(result.fields);
        }
        setFormError(result.error ?? "Your message couldn't be sent.");
        setStatus("error");
        return;
      }

      setStatus("success");
      requestAnimationFrame(() => successRef.current?.focus());
    } catch {
      setFormError("Network error — please check your connection.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl border border-border bg-surface p-8 text-center outline-none"
      >
        <p className="font-heading text-2xl tracking-tight">
          Thanks — I&apos;ll get back to you soon.
        </p>
        <p className="mt-2 text-muted">
          Your message is on its way to my inbox.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-border bg-surface p-6 text-left md:p-8"
    >
      <div className="space-y-5">
        {fields.map((field) => {
          const error = errors[field.name];
          const id = `contact-${field.name}`;
          const common = {
            id,
            name: field.name,
            value: values[field.name],
            required: true,
            autoComplete: field.autoComplete,
            "aria-invalid": error ? true : undefined,
            "aria-describedby": error ? `${id}-error` : undefined,
            onChange: (
              event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
            ) => {
              const value = event.target.value;
              setValues((current) => ({ ...current, [field.name]: value }));
              if (error)
                setErrors((current) => ({
                  ...current,
                  [field.name]: undefined,
                }));
            },
            className: `${inputClasses} ${error ? "border-red-700 dark:border-red-400" : "border-subtle"}`,
          };

          return (
            <div key={field.name}>
              <label
                htmlFor={id}
                className="text-sm font-medium text-foreground"
              >
                {field.label}
              </label>
              {field.name === "message" ? (
                <textarea
                  {...common}
                  rows={5}
                  maxLength={limits.messageMax}
                  className={`${common.className} resize-y`}
                />
              ) : (
                <input
                  {...common}
                  type={field.type ?? "text"}
                  maxLength={field.name === "name" ? limits.name : limits.email}
                />
              )}
              {error && (
                <p id={`${id}-error`} className="mt-2 text-sm text-red-700 dark:text-red-400">
                  {error}
                </p>
              )}
            </div>
          );
        })}

        {/* Honeypot for bots: hidden from people and assistive tech. */}
        <div aria-hidden="true" className="hidden">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
      </div>

      {status === "error" && formError && (
        <p
          role="alert"
          className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800 dark:bg-red-950/40 dark:text-red-300"
        >
          {formError} Your message is still here — try again, or email me
          directly below.
        </p>
      )}

      <Button
        type="submit"
        variant="accent"
        disabled={status === "submitting"}
        aria-busy={status === "submitting"}
        className="mt-6 w-full sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
