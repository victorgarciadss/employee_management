import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function Login() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        try{

            const response = await fetch("http://localhost:8080/api/users/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            
            if(!response.ok) {
                const textResp = await response.text();
                toast.error(textResp);
                return;
            }

            const respJson = await response.json();
            localStorage.setItem("token", respJson.token);
            navigate("/");
            
        }
        catch(err) {
            console.log(err);
        }
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen gap-8 bg-gray-100">
            <h1 className="text-4xl">Gestão de funcionários</h1>

            <form className="shadow-2xl p-4 rounded-lg text-black bg-white" onSubmit={handleLogin}>

                <h2 className="text-xl mb-8 min-w-xs w-md">Digite suas credenciais para fazer Login</h2>

                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu email..."
                        className="border p-2 rounded-lg"
                    />
                </div>

                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Digite sua senha..."
                        className="border p-2 rounded-lg"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white p-4 rounded-2xl w-full mt-4 cursor-pointer hover:bg-blue-700"
                >
                    Entrar
                </button>
            </form>
        </main>
    )
}