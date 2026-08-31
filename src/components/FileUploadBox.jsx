import { useRef, useState } from "react";
import { Upload, X, FileText } from "lucide-react";


const FileUploadPopup = ({ onClose, onUpload,filesrc }) => {
    const inputRef = useRef(null);
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0];

        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleUpload = () => {
        if (!file) return;
        onUpload?.(file);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 ">
            <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute cursor-pointer right-4 top-4 rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                    <X size={20} />
                </button>

                {/* Header */}
                <div className="mb-5">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Upload File
                    </h2>

                    <p className="text-red-500 text-sm " > * make sure your excel file look like this --</p>
                    <img src={filesrc} className=" py-3 object-cover">

                    </img>

                    <p className="mt-1 text-sm text-gray-500">
                        Select a file to upload
                    </p>
                </div>

                {/* Upload Area */}
                <div
                    onClick={() => inputRef.current?.click()}
                    className="cursor-pointer rounded-xl border-2 border-dashed border-gray-300 p-8 text-center transition hover:border-blue-500 hover:bg-blue-50"
                >
                    <input

                        ref={inputRef}
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".xls,.xlsx"
                    />

                    <Upload
                        size={32}
                        className="mx-auto mb-3 text-blue-500"
                    />

                    <p className="text-sm font-medium text-gray-700">
                        Click to upload
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                        Excel file only allowed
                    </p>
                </div>

                {/* Selected File */}
                {file && (
                    <div className="mt-4 flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                        <FileText
                            size={22}
                            className="text-blue-500"
                        />

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-700">
                                {file.name}
                            </p>

                            <p className="text-xs text-gray-400">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                        </div>

                        <button
                            onClick={() => setFile(null)}
                            className="text-gray-400 hover:text-red-500"
                        >
                            <X size={18} />
                        </button>
                    </div>
                )}

                {/* Actions */}
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleUpload}
                        disabled={!file}
                        className=" cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FileUploadPopup;