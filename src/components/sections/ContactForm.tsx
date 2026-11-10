import { useState } from "react";
import { useForm } from "react-hook-form";
import type { UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { brand } from "../../data/site";
import type { ContactPayload, TeamMember } from "../../types";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Tell us who you are (2 characters minimum).")
    .max(60, "Please keep your name under 60 characters."),
  email: z
    .string()
    .trim()
    .min(1, "An email address is required so we can reply.")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "That does not look like a valid email address."),
  subject: z
    .string()
    .trim()
    .min(4, "Add a short subject (4 characters minimum).")
    .max(90, "Keep the subject under 90 characters."),
  message: z
    .string()
    .trim()
    .min(20, "Please give us at least 20 characters of context.")
    .max(2000, "Messages are limited to 2000 characters."),
  projectType: z.string().trim().max(40).optional(),
  /** Honeypot. Deliberately not validated by the schema — checked in onSubmit. */
  company: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

type Status = "idle" | "sending" | "success" | "error" | "unconfigured";

/** The exact text the visitor submitted, kept for the mailto fallback link. */
type Snapshot = Pick<FormValues, "name" | "email" | "subject" | "message">;

const projectTypes = [
  "Full-stack application",
  "Frontend build",
  "Backend or API work",
  "Database design or migration",
  "Audit or rescue of an existing codebase",
  "Something else",
];

const fieldClass =
  "w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-ink transition-colors duration-200 placeholder:text-ink/35 focus:border-electric focus:outline-none focus:ring-2 focus:ring-electric/35";

const labelClass = "mb-1.5 block text-sm font-bold text-ink/80";

const errorClass = "mt-1.5 flex items-center gap-1.5 text-[0.82rem] font-semibold text-coral";

interface ContactFormProps {
  /** When set, the message is addressed to one developer instead of the crew. */
  member?: TeamMember;
  /** Show the project-type selector (team inquiries only). */
  withProjectType?: boolean;
}

function buildMailto(to: string, snapshot: Snapshot | null): string {
  const subject = encodeURIComponent(snapshot?.subject ?? "");
  const body = encodeURIComponent(
    snapshot ? `${snapshot.message}\n\n— ${snapshot.name} (${snapshot.email})` : "",
  );
  return `mailto:${to}?subject=${subject}&body=${body}`;
}

export function ContactForm({ member, withProjectType = false }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [detail, setDetail] = useState<string | null>(null);
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [rejected, setRejected] = useState(false);

  const recipient = member?.email ?? brand.email;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: { name: "", email: "", subject: "", message: "", projectType: "", company: "" },
  });

  const onSubmit = async (values: FormValues) => {
    // Honeypot: a human never fills the hidden company field. Reject silently
    // rather than pretending something was delivered.
    if (values.company?.trim()) {
      setRejected(true);
      setStatus("error");
      setDetail("This submission was rejected automatically by the spam filter.");
      return;
    }

    setStatus("sending");
    setDetail(null);
    setRejected(false);
    setSnapshot(values);

    const payload: ContactPayload = {
      name: values.name,
      email: values.email,
      subject: values.subject,
      message: values.message,
      ...(withProjectType && values.projectType ? { projectType: values.projectType } : {}),
      ...(member ? { toMemberSlug: member.slug } : {}),
    };

    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

    // Nothing configured: say so plainly. No success message is ever implied.
    if (!endpoint) {
      setStatus("unconfigured");
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`The message service responded ${response.status}.`);

      setStatus("success");
      reset({ name: "", email: "", subject: "", message: "", projectType: "", company: "" });
    } catch (error) {
      setDetail(error instanceof Error ? error.message : "The request did not complete.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="surface flex flex-col gap-4 border-l-4 border-l-mint p-7">
        <span className="flex items-center gap-2.5 font-display text-2xl font-bold text-ink">
          <CheckCircle2 className="h-6 w-6 text-mint" aria-hidden="true" />
          Delivered.
        </span>
        <p className="text-ink/70">
          The service accepted your message and the endpoint returned a successful response.{" "}
          {member
            ? `${member.name} replies from ${recipient}.`
            : `${brand.name} replies from ${recipient}.`}
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="btn btn--ink w-fit">
          Write another
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="relative flex flex-col gap-5">
      <div className="surface flex flex-col gap-5 p-6 md:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="contact-name">
              Your name <span className="text-coral" aria-hidden="true">*</span>
            </label>
            <input
              id="contact-name"
              {...register("name")}
              aria-required="true"
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              autoComplete="name"
              maxLength={60}
              className={fieldClass}
              placeholder="Priya Raman"
            />
            {errors.name ? (
              <p id="contact-name-error" className={errorClass}>
                <AlertCircle className="h-4 w-4" aria-hidden="true" />
                {errors.name.message}
              </p>
            ) : null}
          </div>

          <div>
            <label className={labelClass} htmlFor="contact-email">
              Email <span className="text-coral" aria-hidden="true">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              {...register("email")}
              aria-required="true"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              autoComplete="email"
              maxLength={160}
              className={fieldClass}
              placeholder="you@company.com"
            />
            {errors.email ? (
              <p id="contact-email-error" className={errorClass}>
                <AlertCircle className="h-4 w-4" aria-hidden="true" />
                {errors.email.message}
              </p>
            ) : null}
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="contact-subject">
            Subject <span className="text-coral" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-subject"
            {...register("subject")}
            aria-required="true"
            aria-invalid={errors.subject ? true : undefined}
            aria-describedby={errors.subject ? "contact-subject-error" : undefined}
            maxLength={90}
            className={fieldClass}
            placeholder="Realtime dashboard for a logistics team"
          />
          {errors.subject ? (
            <p id="contact-subject-error" className={errorClass}>
              <AlertCircle className="h-4 w-4" aria-hidden="true" />
              {errors.subject.message}
            </p>
          ) : null}
        </div>

        {withProjectType ? (
          <div>
            <label className={labelClass} htmlFor="contact-type">
              Project type <span className="font-normal text-ink/45">(optional)</span>
            </label>
            <select id="contact-type" {...register("projectType")} className={fieldClass}>
              <option value="">Not sure yet</option>
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <MessageField register={register} error={errors.message} />

        {/* Honeypot field: hidden from people, filled by naive bots. */}
        <div className="pointer-events-none absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor="contact-company">Company</label>
          <input id="contact-company" tabIndex={-1} autoComplete="off" {...register("company")} />
        </div>

        {status === "unconfigured" ? (
          <div role="alert" className="rounded-xl border-l-4 border-yellow bg-yellow/15 p-4 text-sm text-ink/80">
            <p className="font-bold">Validated — but there is nowhere to send it yet.</p>
            <p className="mt-1">
              Set <code className="font-mono text-xs">VITE_CONTACT_ENDPOINT</code> in <code className="font-mono text-xs">.env</code> to a
              service that accepts these posts (EmailJS, a serverless function, or a Spring Boot{" "}
              <code className="font-mono text-xs">POST /api/contact</code> writing to MySQL). This form will not
              claim a message was sent until one of those actually returns success.
            </p>
            <a
              href={buildMailto(recipient, snapshot)}
              className="mt-2 inline-block font-bold text-electric underline underline-offset-4"
            >
              Email {member?.name.split(" ")[0] ?? "the crew"} directly instead
            </a>
          </div>
        ) : null}

        {status === "error" ? (
          <p role="alert" className="flex items-start gap-2 rounded-xl border-l-4 border-coral bg-coral/10 p-4 text-sm font-semibold text-ink/80">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-coral" aria-hidden="true" />
            <span>
              Not sent. {detail}
              {rejected ? "" : " Your text is still here — fix the cause and press send again."}
            </span>
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" className="btn" disabled={isSubmitting || status === "sending"}>
            {isSubmitting || status === "sending" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Sending…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" aria-hidden="true" />
                {member ? `Message ${member.name.split(" ")[0]}` : "Send to the crew"}
              </>
            )}
          </button>
          <p className="max-w-sm text-[0.8rem] text-ink/50">
            <span aria-hidden="true">* </span>
            <span className="sr-only">Required fields are marked with an asterisk. </span>
            Your text stays on this page until a configured service accepts it.
          </p>
        </div>

        <p className="sr-only" aria-live="polite">
          {status === "sending" ? "Sending your message, please wait." : ""}
        </p>
      </div>
    </form>
  );
}

function MessageField({
  register,
  error,
}: {
  register: UseFormRegister<FormValues>;
  error?: { message?: string };
}) {
  return (
    <div>
      <label className={labelClass} htmlFor="contact-message">
        Message <span className="text-coral" aria-hidden="true">*</span>
      </label>
      <textarea
        id="contact-message"
        rows={6}
        {...register("message")}
        aria-required="true"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "contact-message-error" : "contact-message-hint"}
        maxLength={2000}
        className={`${fieldClass} resize-y`}
        placeholder="What are you building, who is it for, and what does done look like?"
      />
      <p id="contact-message-hint" className="mt-1.5 text-[0.78rem] text-ink/45">
        20–2000 characters. Concrete constraints get concrete answers.
      </p>
      {error ? (
        <p id="contact-message-error" className={errorClass}>
          <AlertCircle className="h-4 w-4" aria-hidden="true" />
          {error.message}
        </p>
      ) : null}
    </div>
  );
}
