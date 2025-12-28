import React, { useRef, useState } from "react";

const Contact = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});

  const validate = (form) => {
    const e = {};
    const email = form.get("email")?.trim();
    const name = form.get("name")?.trim();
    const message = form.get("message")?.trim();
    const subject = form.get("subject")?.trim();

    if (!name) e.name = "Please enter your name.";
    if (!email) e.email = "Please enter your email.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      e.email = "Please enter a valid email.";
    if (!subject) e.subject = "Please add a subject.";
    if (!message) e.message = "Please add a message.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const validation = validate(form);
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }

    setErrors({});
    setStatus("Sending...");

    try {
      // TODO: real endpoint
      // await fetch('/api/contact', { ... });
      setStatus("Message sent. Thanks for reaching out!");
      if (formRef.current) formRef.current.reset();
    } catch (err) {
      setStatus("Failed to send. Try again later.");
    }

    setTimeout(() => setStatus(""), 3500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* header */}
        <div className="mb-8 max-w-2xl">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Get in touch
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Have a question or feature idea? Email{" "}
            <strong>support@example.com</strong> or use the form below.
          </p>
        </div>

        {/* info cards */}
        <div className="mb-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-100">
              Customer support
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              support@example.com
            </p>
            <p className="mt-3 text-xs text-slate-400">
              Phone: +1 (555) 123-4567
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Hours: Mon–Fri, 9:00–17:00 (IST)
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-100">
              Follow us
            </h3>
            <p className="mt-2 text-xs text-slate-400">
              Stay updated with new features and product tips.
            </p>
            <div className="mt-3 flex flex-wrap gap-3 text-xs font-medium">
              <a
                href="#"
                className="rounded-full bg-slate-800 px-3 py-1 text-slate-200 hover:bg-slate-700"
              >
                Twitter
              </a>
              <a
                href="#"
                className="rounded-full bg-slate-800 px-3 py-1 text-slate-200 hover:bg-slate-700"
              >
                GitHub
              </a>
              <a
                href="#"
                className="rounded-full bg-slate-800 px-3 py-1 text-slate-200 hover:bg-slate-700"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-sm"
        >
          <h2 className="mb-4 text-sm font-semibold text-slate-100">
            Send a message
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <input
                name="name"
                aria-label="name"
                placeholder="Your name"
                className="w-full rounded-md border border-slate-700 bg-slate-950/80 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-400">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                name="email"
                aria-label="email"
                placeholder="Your email"
                className="w-full rounded-md border border-slate-700 bg-slate-950/80 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <input
                name="subject"
                aria-label="subject"
                placeholder="Subject"
                className="w-full rounded-md border border-slate-700 bg-slate-950/80 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              {errors.subject && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.subject}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <textarea
                name="message"
                aria-label="message"
                placeholder="Your message"
                rows={5}
                className="w-full rounded-md border border-slate-700 bg-slate-950/80 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 items-start justify-between sm:flex-row sm:items-center">
            <p className="text-xs text-slate-400">
              We usually reply within 1–2 business days.
            </p>
            <button
              type="submit"
              className="inline-flex items-center rounded-full bg-indigo-500 px-5 py-2 text-xs font-medium text-white shadow-md shadow-indigo-500/40 transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Send message
            </button>
          </div>
        </form>

        {status && (
          <p className="mt-3 text-xs text-emerald-400">{status}</p>
        )}
      </div>
    </div>
  );
};

export default Contact;
