import { AlertCircle } from "lucide-react";

const ErrorComponent = ({ message = "Something went wrong!" }) => {
    return (
        <div className="flex min-h-[250px] w-full items-center justify-center rounded-xl border border-red-200 bg-red-50">
            <div className="flex flex-col items-center text-center">

                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                    <AlertCircle className="h-6 w-6 text-red-500" />
                </div>

                <h2 className="text-base font-semibold text-red-700">
                    Error
                </h2>

                <p className="mt-1 max-w-md text-sm text-red-600">
                    {message}
                </p>

            </div>
        </div>
    );
};

export default ErrorComponent;