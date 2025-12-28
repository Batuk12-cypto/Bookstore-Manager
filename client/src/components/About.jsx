import React from "react";

const About = () => {
  const team = [
    { name: "Mahesh", role: "Founder & CEO", bio: "Passionate about books and building simple apps.", img: "" },
    { name: "Mahesh", role: "Product Designer", bio: "Designs delightful reading experiences and UX for authors.", img: "" },
    { name: "Mahesh", role: "Backend Engineer", bio: "Builds scalable APIs and loves Node.js + MongoDB.", img: "" },
    { name: "Mahesh", role: "Frontend Engineer", bio: "Creates accessible interfaces with React and Tailwind.", img: "" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* hero about */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 p-[1px] shadow-lg mb-10">
          <div className="relative h-full w-full rounded-[1.4rem] bg-slate-950/95 px-8 py-10 md:px-12 md:py-12">
            <div className="absolute -top-16 -right-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
            <div className="relative max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                About Bookstore Manager
              </h1>
              <p className="mt-3 text-sm md:text-base text-slate-200/90">
                We are a small team building a lightweight bookstore management app that keeps
                your catalog organized without getting in the way.
              </p>
              <p className="mt-4 text-sm md:text-base text-slate-300/90">
                Since 2023 we have focused on speed, clarity, and accessibility so indie stores
                and hobbyist collectors can manage inventory with confidence.
              </p>
            </div>
          </div>
        </section>

        {/* mission */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-50 mb-3">
            Our mission
          </h2>
          <p className="text-sm text-slate-300 mb-5 max-w-3xl">
            Make book management delightful—whether you run a cozy local shop or maintain a
            private library. The tools stay out of your way so you can focus on stories.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-50 mb-1">Simple</h3>
              <p className="text-xs text-slate-300">
                Intuitive flows and sensible defaults so you can get started in minutes.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-50 mb-1">Reliable</h3>
              <p className="text-xs text-slate-300">
                Built with stability in mind for predictable behavior you can trust.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-50 mb-1">Open</h3>
              <p className="text-xs text-slate-300">
                Clear APIs and documentation so you can extend the product easily.
              </p>
            </div>
          </div>
        </section>

        {/* history */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-slate-50 mb-3">History</h2>
          <ol className="space-y-2 text-sm text-slate-300">
            <li>
              <strong className="text-slate-100">2023:</strong>{" "}
              Project started as a weekend experiment to manage a personal library.
            </li>
            <li>
              <strong className="text-slate-100">2024:</strong>{" "}
              Beta launched and refined with feedback from early bookstore users.
            </li>
            <li>
              <strong className="text-slate-100">2025:</strong>{" "}
              Focused on performance, accessibility, and smoother inventory workflows.
            </li>
          </ol>
        </section>

        {/* team */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-slate-50 mb-4">Our team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, idx) => (
              <article
                key={`${member.name}-${idx}`}
                className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm transition hover:border-indigo-500/80 hover:shadow-lg hover:shadow-indigo-500/25"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500/10 text-base font-semibold text-indigo-300 ring-1 ring-indigo-500/40">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-50">
                      {member.name}
                    </div>
                    <div className="text-xs text-slate-400">
                      {member.role}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-300">{member.bio}</p>
              </article>
            ))}
          </div>
        </section>

        {/* values */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-slate-50 mb-4">Values</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300">
            <li className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3">
              Customer-first: we listen to users and iterate quickly.
            </li>
            <li className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3">
              Quality over noise: avoid features that add friction.
            </li>
            <li className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3">
              Privacy-conscious: keep user data minimal and protected.
            </li>
            <li className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3">
              Community-driven: open to contributions, ideas, and feedback.
            </li>
          </ul>
        </section>

        {/* get involved */}
        <section className="mb-4">
          <h2 className="text-xl font-semibold text-slate-50 mb-3">
            Get involved
          </h2>
          <p className="text-sm text-slate-300 mb-4">
            Want to contribute, report a bug, or request a feature? Reach out at{" "}
            <strong>support@example.com</strong>.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="mailto:support@example.com"
              className="inline-flex items-center rounded-full bg-indigo-500 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/40 transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Email support
            </a>
            <a
              href="#"
              className="text-sm font-medium text-indigo-300 underline-offset-4 hover:underline"
            >
              View source on GitHub
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
