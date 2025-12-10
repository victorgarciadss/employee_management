import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Employee } from "../interfaces/Employee";
import { toast } from "react-toastify";

export function EditEmployee() {

    const { state } = useLocation();
    const employee: Employee = state?.employee;

    const [name, setName] = useState<string>(employee?.name || "");
    const [admissionDate, setAdmissionDate] = useState<string>(String(employee?.admissionDate) || "");
    const [salary, setSalary] = useState<string>(employee?.salary.toString() || "");
    const [status, setStatus] = useState<"Ativo" | "Inativo">(employee?.status || "Ativo");

    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    async function handleUpdateEmployee(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`${apiUrl}/api/employees/${employee.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: name,
                    admissionDate: new Date(admissionDate),
                    salary: Number(salary),
                    status: status
                })
            });

            if(response.status === 200) {
                toast.success("Funcionário atualizado com sucesesso!");
                navigate("/");
            }
            else if(response.status === 401) {
                const respText = await response.text();
                toast.error(respText);
                
                localStorage.removeItem("token");
                navigate("/login");
            }
            else {
                const respJson = await response.json();
                throw new Error(respJson.message);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <main className="flex flex-col items-center min-h-screen bg-gray-100">
            <section className="my-8">
                <h2 className="text-3xl font-semibold">Editar Funcionário</h2>

                <form 
                    onSubmit={handleUpdateEmployee}
                    className="bg-white p-8 rounded-lg shadow-lg flex flex-col gap-4 mt-6 w-96"
                >
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Nome:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nome..."
                            className="border p-2 rounded-sm bg-gray-100"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="admissionDate">Data de Admissão:</label>
                        <input 
                            type="date"
                            name="admissionDate"
                            id="admissionDate"
                            required
                            value={admissionDate}
                            onChange={(e) => setAdmissionDate(e.target.value)}
                            className="border p-2 rounded-sm bg-gray-100"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="salary">Salário:</label>
                        <input
                            type="number"
                            name="salary"
                            id="salary"
                            required
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            placeholder="R$ 0,00"
                            className="border p-2 rounded-sm bg-gray-100"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="status">Status:</label>
                        <select
                            name="status"
                            id="status"
                            required
                            value={status}
                            onChange={(e) => setStatus(e.target.value as "Ativo" | "Inativo")}
                            className="border p-2 rounded-sm bg-gray-100"
                        >
                            <option value="Ativo">Ativo</option>
                            <option value="Inativo">Inativo</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-700 text-white rounded-lg p-4 cursor-pointer hover:bg-blue-900 mt-4"
                    >
                        Atualizar
                    </button>
                </form>
            </section>
        </main>
    )
}