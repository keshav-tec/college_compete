import { useRef, useState } from "react";
import {
  Send,
  ImagePlus,
  X,
  Sparkles,
} from "lucide-react";

export default function DoubtForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fileInputRef = useRef(null);

  const handleImage = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5MB.");
      return;
    }

    setError("");

    setImage({
      file,
      preview: URL.createObjectURL(file),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setError("Please enter a doubt title.");
      return;
    }

    if (!description.trim()) {
      setError("Please describe your doubt.");
      return;
    }

    if (!subject) {
      setError("Please select a subject.");
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        subject,
        image: image?.file || null,
      });

      setTitle("");
      setDescription("");
      setSubject("");
      setImage(null);
    } catch (err) {
      setError("Unable to submit doubt. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-slate-800">
            Ask a Doubt
          </h2>

          <Sparkles
            size={18}
            className="text-indigo-500"
          />
        </div>

        <p className="mt-1 text-sm text-slate-500">
          Ask your academic question and get matched with a
          peer tutor.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Doubt Title
          </label>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. How does BFS work?"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Subject
          </label>

          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">Select subject</option>
            <option value="DSA">Data Structures & Algorithms</option>
            <option value="OS">Operating Systems</option>
            <option value="DBMS">Database Management</option>
            <option value="Computer Networks">
              Computer Networks
            </option>
            <option value="Java">Java Programming</option>
            <option value="Mathematics">
              Discrete Mathematics
            </option>
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Describe your doubt
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder="Explain what you are struggling with..."
            className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="hidden"
          />

          {!image ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 rounded-xl border border-dashed border-slate-300 px-4 py-3 text-sm text-slate-500 transition hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600"
            >
              <ImagePlus size={18} />
              Attach question image
            </button>
          ) : (
            <div className="relative w-fit">
              <img
                src={image.preview}
                alt="Doubt preview"
                className="h-24 w-24 rounded-xl object-cover"
              />

              <button
                type="button"
                onClick={() => setImage(null)}
                className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <button
          disabled={submitting}
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send size={18} />

          {submitting ? "Submitting..." : "Submit Doubt"}
        </button>
      </form>
    </div>
  );
}