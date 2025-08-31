import React from 'react';

export function OpenAPIModal({
  isOpen,
  url,
  onClose,
}: {
  isOpen: boolean;
  url?: string;
  onClose: () => void;
}) {
  if (!isOpen) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-gray-900 text-gray-100 border border-gray-800 rounded-lg p-4 w-[90%] max-w-md shadow-xl">
        <h2 className="text-lg font-semibold mb-2">OpenAPI Spec</h2>
        {url ? (
          <p className="text-sm mb-4">
            View the API spec here:{' '}
            <a href={url} target="_blank" rel="noreferrer" className="text-green-400 underline">
              {url}
            </a>
          </p>
        ) : (
          <p className="text-sm text-gray-400 mb-4">No OpenAPI URL provided.</p>
        )}
        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded"
            onClick={onClose}
          >
            Close
          </button>
          {url && (
            <a
              className="px-3 py-1.5 bg-green-600 rounded"
              href={url}
              target="_blank"
              rel="noreferrer"
            >
              Open
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
