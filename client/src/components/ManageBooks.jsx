import React, { useState, useEffect } from "react";
import { bookbaseUrl } from "../../axiosinstance";

const ManageBooks = () => {
  const [bookForm, setBookForm] = useState({
    BookName: "",
    BookTitle: "",
    BookAuthor: "",
    SellingPrice: "",
    PublishDate: "",
  });
  const [bookList, setBookList] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toasts, setToasts] = useState([]);

  const getAllbookList = async () => {
    try {
      const res = await bookbaseUrl.get("/booklist");
      const data = res.data;
      setBookList(data?.bookList || data || []);
    } catch (error) {
      console.error(
        "Error fetching book list",
        error?.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    getAllbookList();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setBookForm((prev) => ({ ...prev, [name]: value }));
  };

  const addToast = (message, type = "info") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  };

  const handleSubmit = async () => {
    try {
      if (
        !bookForm.BookName ||
        !bookForm.BookTitle ||
        !bookForm.BookAuthor ||
        !bookForm.SellingPrice
      ) {
        addToast("Please fill all required fields", "error");
        return;
      }
      setIsSaving(true);

      const payload = {
        BookName: bookForm.BookName,
        BookTitle: bookForm.BookTitle,
        AuthorName: bookForm.BookAuthor,
        Price: Number(bookForm.SellingPrice),
        PublishedDate: bookForm.PublishDate || null,
      };

      if (editingId) {
        const { data } = await bookbaseUrl.put(
          `/updatebook/${editingId}`,
          payload
        );
        addToast(data?.message || "Updated", "success");
        setEditingId(null);
      } else {
        const { data } = await bookbaseUrl.post("/addbook", payload);
        addToast(data?.message || "Saved", "success");
      }

      setBookForm({
        BookName: "",
        BookTitle: "",
        BookAuthor: "",
        SellingPrice: "",
        PublishDate: "",
      });
      await getAllbookList();
    } catch (error) {
      console.error(
        "Error adding book",
        error?.response?.status,
        error?.response?.data || error.message
      );
      addToast(error?.response?.data?.message || "Error adding book", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const requestDelete = (id) => setDeleteTarget(id);

  const startEdit = (book) => {
    setBookForm({
      BookName: book?.BookName || "",
      BookTitle: book?.BookTitle || "",
      BookAuthor: book?.AuthorName || book?.BookAuthor || "",
      SellingPrice: (book?.Price ?? book?.SellingPrice) || "",
      PublishDate: book?.PublishedDate || book?.PublishDate || "",
    });
    setEditingId(book?._id || book?.id || null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setBookForm({
      BookName: "",
      BookTitle: "",
      BookAuthor: "",
      SellingPrice: "",
      PublishDate: "",
    });
  };

  const performDelete = async () => {
    if (!deleteTarget) return;
    setDeletingId(deleteTarget);
    try {
      const { data } = await bookbaseUrl.delete(`/deletebook/${deleteTarget}`);
      addToast(data?.message || "Deleted", "success");
      setDeleteTarget(null);
      await getAllbookList();
    } catch (error) {
      console.error(
        "Error deleting book",
        error?.response?.data || error.message
      );
      addToast(
        error?.response?.data?.message || "Error deleting book",
        "error"
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* header */}
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Manage books
            </h1>
            <p className="mt-1 text-xs text-slate-400">
              Add, update, and remove books from your inventory.
            </p>
          </div>
          <span className="inline-flex items-center rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-medium text-slate-300 ring-1 ring-slate-700/60">
            Total books: {bookList.length}
          </span>
        </div>

        {/* form */}
        <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-slate-100">
            Book details
          </h2>

          <div className="grid gap-4 md:grid-cols-5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-300">
                Book name<span className="text-red-400">*</span>
              </label>
              <input
                name="BookName"
                value={bookForm.BookName}
                onChange={handleFormChange}
                placeholder="Eg. Atomic Habits"
                className="h-9 w-full rounded-md border border-slate-700 bg-slate-950/70 px-3 text-xs text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-300">
                Book title<span className="text-red-400">*</span>
              </label>
              <input
                name="BookTitle"
                value={bookForm.BookTitle}
                onChange={handleFormChange}
                placeholder="Subtitle or edition"
                className="h-9 w-full rounded-md border border-slate-700 bg-slate-950/70 px-3 text-xs text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-300">
                Book author<span className="text-red-400">*</span>
              </label>
              <input
                name="BookAuthor"
                value={bookForm.BookAuthor}
                onChange={handleFormChange}
                placeholder="Author name"
                className="h-9 w-full rounded-md border border-slate-700 bg-slate-950/70 px-3 text-xs text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-300">
                Selling price<span className="text-red-400">*</span>
              </label>
              <input
                name="SellingPrice"
                value={bookForm.SellingPrice}
                onChange={handleFormChange}
                placeholder="Eg. 399"
                className="h-9 w-full rounded-md border border-slate-700 bg-slate-950/70 px-3 text-xs text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-300">
                Publish date
              </label>
              <input
                type="date"
                name="PublishDate"
                value={bookForm.PublishDate}
                onChange={handleFormChange}
                className="h-9 w-full rounded-md border border-slate-700 bg-slate-950/70 px-3 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end gap-2">
            {editingId && (
              <button
                onClick={cancelEdit}
                className="inline-flex items-center rounded-full border border-slate-700 px-4 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-800"
              >
                Cancel edit
              </button>
            )}
            <button
              className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-500 px-5 py-1.5 text-xs font-medium text-white shadow-md shadow-indigo-500/40 transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={handleSubmit}
              disabled={isSaving}
            >
              {isSaving && (
                <svg
                  className="h-3.5 w-3.5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              <span>
                {isSaving
                  ? editingId
                    ? "Updating..."
                    : "Saving..."
                  : editingId
                  ? "Update book"
                  : "Add book"}
              </span>
            </button>
          </div>
        </div>

        {/* table */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-100">
              Inventory list
            </h2>
            <span className="text-[11px] text-slate-400">
              Click edit to update, delete to remove.
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/40">
            <table className="min-w-full table-auto text-left text-xs text-slate-200">
              <thead className="bg-slate-900/90 text-[11px] uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-4 py-3">Book name</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Author</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Publish date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {bookList?.map((book, index) => {
                  const rowId = book?._id || book?.id || index;
                  const date =
                    book?.PublishedDate || book?.PublishDate
                      ? new Date(
                          book?.PublishedDate || book?.PublishDate
                        ).toLocaleDateString()
                      : "";

                  return (
                    <tr
                      key={rowId}
                      className="hover:bg-slate-900/70 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="max-w-xs truncate text-xs text-slate-100">
                          {book?.BookName}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="max-w-xs truncate text-xs text-slate-200">
                          {book?.BookTitle}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="max-w-xs truncate text-xs text-slate-300">
                          {book?.AuthorName || book?.BookAuthor}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-emerald-300">
                        {book?.Price ?? book?.SellingPrice}
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-300">
                        {date}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            className="rounded-full border border-amber-400/40 bg-amber-500/10 px-3 py-1 text-[11px] font-medium text-amber-300 hover:bg-amber-500/20"
                            onClick={() => startEdit(book)}
                          >
                            Edit
                          </button>
                          <button
                            className="rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1 text-[11px] font-medium text-red-300 hover:bg-red-500/20 disabled:opacity-60"
                            onClick={() =>
                              requestDelete(book?._id || book?.id)
                            }
                            disabled={deletingId === (book?._id || book?.id)}
                          >
                            {deletingId === (book?._id || book?.id)
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {bookList.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-6 text-center text-xs text-slate-500"
                    >
                      No books found. Add your first book above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* delete modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setDeleteTarget(null)}
          ></div>
          <div className="relative z-50 w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-950 px-6 py-5 shadow-2xl shadow-black/60">
            <h3 className="text-sm font-semibold text-slate-50 mb-2">
              Delete book
            </h3>
            <p className="mb-4 text-xs text-slate-300">
              Are you sure you want to delete this book from your inventory?
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="rounded-full border border-slate-700 px-4 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-800"
                onClick={() => setDeleteTarget(null)}
                disabled={deletingId !== null}
              >
                Cancel
              </button>
              <button
                className="rounded-full bg-red-500 px-4 py-1.5 text-xs font-medium text-white shadow-md shadow-red-500/40 hover:bg-red-400 disabled:opacity-60"
                onClick={performDelete}
                disabled={deletingId !== null}
              >
                {deletingId ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* toasts */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`min-w-[220px] rounded-xl px-4 py-2 text-xs font-medium shadow-lg ${
              t.type === "error"
                ? "bg-red-500 text-white shadow-red-500/40"
                : "bg-emerald-500 text-white shadow-emerald-500/40"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBooks;
