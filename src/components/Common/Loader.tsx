"use client";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">

        <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"></div>

        <p className="text-sm text-white">
          Loading...
        </p>

      </div>
    </div>
  );
}