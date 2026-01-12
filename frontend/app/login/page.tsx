export default function LoginPage(){
    return<>
        <div className="w-full h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="username">Username</label>
                        <input className="w-full border border-gray-300 p-2 rounded" type="text" id="username" name="username" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                        <input className="w-full border border-gray-300 p-2 rounded" type="password" id="password" name="password" />
                    </div>
                    <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700" type="submit">Login</button>
                </form>
            </div>
        </div>
    </>
}