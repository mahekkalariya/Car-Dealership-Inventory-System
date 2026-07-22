export default function Login() {
  return (
    <div className="max-w-sm mx-auto mt-12 bg-white p-6 rounded-lg border border-gray-200">
      <h1 className="text-xl font-semibold mb-4">Log in</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input type="email" className="w-full border border-gray-300 rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Password</label>
          <input type="password" className="w-full border border-gray-300 rounded-md px-3 py-2" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700">
          Log in
        </button>
      </form>
    </div>
  );
}