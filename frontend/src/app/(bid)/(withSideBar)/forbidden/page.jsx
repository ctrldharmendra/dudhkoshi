import Link from "next/link";
import { IoIosLogOut } from "react-icons/io";

export default function Example() {
    return (
        <div className="flex h-[100vh] flex-col items-center justify-center text-sm">
            <p className="font-medium text-lg text-indigo-500">Restricted</p>
            <h2 className="md:text-6xl text-4xl font-semibold text-gray-800">Not Allowed</h2>
            <p className="text-base mt-4 text-gray-500">Sorry, we couldn’t find the page you’re looking for.</p>
            <div className="flex items-center gap-4 mt-6">
                <Link href="/dashboard" type="button" className="bg-indigo-500 hover:bg-indigo-600 px-7 py-2.5 text-white rounded active:scale-95 transition-all">
                    Go back Dashboard
                </Link>
                <Link href="/logout" type="button" className="group flex items-center gap-2 px-7 py-2.5 active:scale-95 transition">
                    Log Out Instead
                   <IoIosLogOut />
                </Link>
            </div>
        </div>
    );
};