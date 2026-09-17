"use client";

import { useState } from "react";

type Permission = "edit" | "view";

type ShareModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ShareModal({
  isOpen,
  onClose,
}: ShareModalProps) {
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState<Permission>("edit");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!isOpen) {
    return null;
  }

  function handleShare() {
    const trimmedEmail = email.trim();

    setError("");
    setSuccess(false);

    if (!trimmedEmail) {
      setError("Please enter an email address.");
      return;
    }

    if (!trimmedEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    // Temporary behavior.
    // Later, this will send the permission to Supabase.
    console.log("Sharing document:", {
      email: trimmedEmail,
      permission,
    });

    setSuccess(true);
  }

  function handleClose() {
    setEmail("");
    setPermission("edit");
    setError("");
    setSuccess(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Share document
          </h2>

          <button
            onClick={handleClose}
            className="rounded-md px-2 py-1 text-xl text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="share-email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Email
          </label>

          <input
            id="share-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="teammate@example.com"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Permission */}
        <div className="mb-4">
          <label
            htmlFor="share-permission"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Permission
          </label>

          <select
            id="share-permission"
            value={permission}
            onChange={(event) =>
              setPermission(event.target.value as Permission)
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="edit">Can edit</option>
            <option value="view">Can view</option>
          </select>
        </div>

        {/* Error */}
        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Success */}
        {success && (
          <p className="mb-4 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-600">
            Document shared successfully.
          </p>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleShare}
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
}