"use client";

import { useState } from "react";

export default function ImageUploader({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert(data.error || "Upload failed");
      return;
    }

    onUpload(data.url);
  }

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
      />

      {loading && (
        <p className="text-sm text-gray-500">
          Uploading...
        </p>
      )}
    </div>
  );
}
