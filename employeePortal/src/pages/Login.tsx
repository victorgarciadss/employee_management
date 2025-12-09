import { useEffect, useState } from "react"

export function Login() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log({ email, password });
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