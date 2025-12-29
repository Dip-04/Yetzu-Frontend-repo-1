export default function EducatorDashboardPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Educator Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">My Classes</h3>
                    <p className="text-3xl font-bold text-gray-800 mt-2">3</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Pending Grading</h3>
                    <p className="text-3xl font-bold text-gray-800 mt-2">15</p>
                </div>
            </div>
        </div>
    );
}
