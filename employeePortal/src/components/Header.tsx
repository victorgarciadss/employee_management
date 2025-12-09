import { useNavigate } from "react-router-dom";

export function Header() {

    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <header className="flex items-center justify-between bg-blue-500 h-24 w-full p-4">
            <h1 className="text-4xl text-white font-bold">Gestão de funcionários</h1>

            <button onClick={logout} className="bg-white px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200">Logout</button>
        </header>
    )
}