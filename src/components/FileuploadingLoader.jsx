import { FileSpreadsheet, X } from "lucide-react";

const FileUploading = ({
    file = 18076,
    progress = 0,
    onCancel,
}) => {
    if (!file) return null;

    const fileSize = (file.size / 1024 / 1024).toFixed(2);

    return (
        <div className="w-full max-w-md h-60 rounded-2xl border  border-gray-200 bg-white p-5 shadow-lg">

            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h2 className="text-base font-semibold text-gray-800">
                        Uploading file...
                    </h2>

                    <p className="text-xs text-gray-400">
                        Please wait while your file is being uploaded
                    </p>
                </div>

                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>

            {/* File Information */}
            <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100">
                    <FileSpreadsheet
                        size={22}
                        className="text-green-600"
                    />
                </div>

                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-700">
                        {file.name || "Driver Excels"}
                    </p>

                    <p className="mt-0.5 text-xs text-gray-400">
                        {fileSize} MB
                    </p>
                </div>

                <span className="text-sm font-semibold text-blue-600">
                    {progress}%
                </span>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                        className="h-full rounded-full bg-blue-600 transition-all duration-300"
                        style={{
                            width: `${progress}%`,
                        }}
                    />
                </div>

                <div className="mt-2 flex justify-between text-xs text-gray-400">
                    <span>
                        {progress < 100
                            ? "Uploading..."
                            : "Upload complete"}
                    </span>

                    <span>
                        {progress}%
                    </span>
                </div>
            </div>
        </div>
    );
};

export default FileUploading;