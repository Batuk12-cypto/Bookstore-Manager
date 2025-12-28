import React, { useEffect, useState } from "react";
import { bookbaseUrl } from "../../axiosinstance";

const Home = () => {
  const [recent, setRecent] = useState([]);
  const [stats, setStats] = useState({ count: 0, totalValue: 0 });

  const loadRecent = async () => {
    try {
      const res = await bookbaseUrl.get("/booklist");
      const list = res.data?.bookList || res.data || [];
      setRecent(list.slice(0, 5));
      const count = list.length;
      const totalValue = list.reduce(
        (s, b) => s + (Number(b.Price ?? b.SellingPrice) || 0),
        0
      );
      setStats({ count, totalValue });
    } catch (err) {
      console.warn("Could not load recent books", err?.message || err);
      const sample = [
        {
          BookName: "Sample Book A",
          BookTitle: "Intro to React",
          AuthorName: "Jane Doe",
          Price: 25,
        },
        {
          BookName: "Sample Book B",
          BookTitle: "Node Essentials",
          AuthorName: "John Smith",
          Price: 30,
        },
      ];
      setRecent(sample);
      setStats({
        count: sample.length,
        totalValue: sample.reduce((s, b) => s + (b.Price || 0), 0),
      });
    }
  };

  useEffect(() => {
    loadRecent();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* top gradient bar */}
      <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500" />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* hero */}
        <div className="mb-10 text-center">
          <span className="inline-flex items-center rounded-full bg-slate-900/80 px-3 py-1 text-xs font-medium text-slate-300 ring-1 ring-slate-700/60">
            📚 Bookstore Dashboard
          </span>
          <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
            Manage your books in one place
          </h1>
          <p className="mt-2 text-sm md:text-base text-slate-400">
            Add, track, and organize your bookstore inventory with a clean dashboard.
          </p>
        </div>

        {/* stats */}
        <div className="mb-10 grid gap-4 md:grid-cols-3">
          <div className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-sm transition hover:border-indigo-500/80 hover:shadow-indigo-500/20">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Total Books
              </p>
              <span className="rounded-full bg-indigo-500/10 px-2 py-1 text-[10px] font-medium text-indigo-300">
                Library
              </span>
            </div>
            <div className="mt-3 text-3xl font-semibold text-slate-50">
              {stats.count}
            </div>
          </div>

          <div className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-sm transition hover:border-emerald-500/80 hover:shadow-emerald-500/20">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Inventory Value
              </p>
              <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-300">
                Estimated
              </span>
            </div>
            <div className="mt-3 text-3xl font-semibold text-emerald-300">
              ${stats.totalValue}
            </div>
          </div>

          <div className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-sm transition hover:border-sky-500/80 hover:shadow-sky-500/20">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Performance
              </p>
              <span className="rounded-full bg-sky-500/10 px-2 py-1 text-[10px] font-medium text-sky-300">
                Realtime
              </span>
            </div>
            <div className="mt-3 text-3xl font-semibold text-sky-300">
              Fast ⚡
            </div>
          </div>
        </div>

        {/* recent books */}
        <div className="mb-10">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-medium text-slate-100">
              Recent books
            </h2>
            <span className="text-xs text-slate-500">
              Showing last {recent.length} items
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {recent.map((b, i) => (
              <div
                key={b?._id || b?.BookName + i}
                className="group flex flex-col rounded-xl border border-slate-800 bg-slate-900/70 p-4 shadow-sm transition hover:border-indigo-500/80 hover:bg-slate-900 hover:shadow-lg hover:shadow-indigo-500/20"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-sm font-semibold text-slate-50">
                      {b?.BookTitle || b?.BookName}
                    </div>
                    <div className="mt-1 text-xs text-slate-400">
                      {b?.AuthorName || b?.BookAuthor || "Unknown author"}
                    </div>
                  </div>
                  <span className="rounded-full bg-indigo-500/10 px-2 py-1 text-[10px] font-medium text-indigo-300">
                    #{i + 1}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="font-medium text-emerald-300">
                    ${b?.Price ?? b?.SellingPrice ?? "-"}
                  </span>
                  <button className="text-xs font-medium text-indigo-300 underline-offset-2 hover:underline">
                    View details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* bottom section */}
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-100">
              Why use this dashboard?
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Keep everything organized with a minimal interface designed for quick actions.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Instantly add, edit, or remove books from your collection.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />
                <span>See total inventory value at a glance.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-400" />
                <span>Connect with APIs or extend features whenever needed.</span>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, "", "/managebook");
                window.dispatchEvent(new PopStateEvent("popstate"));
              }}
              className="inline-flex items-center rounded-full bg-indigo-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-500/40 transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Go to Manage
              <span className="ml-2 text-base">→</span>
            </a>
            <p className="mt-3 text-xs text-slate-500">
              Manage your full list, update prices, and track more details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
