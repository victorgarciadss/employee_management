import { useEffect, useState } from "react";
import { EmployeesTable } from "../components/EmployeesTable";
import { Header } from "../components/Header";
import { RegisterEmployeeForm } from "../components/RegisterEmployeeForm";
import type { Employee } from "../interfaces/Employee";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function Dashboard() {

    const [employees, setEmployees] = useState<Employee[]>([]);
    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    const apiUrl = import.meta.env.VITE_API_URL;

    async function getEmployees() {
        try {
            const response = await fetch(`${apiUrl}/api/employees`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if(response.status === 200) {
                const data = await response.json();
                setEmployees(data);
            }
            else if(response.status === 401) {
                const respText = await response.text();
                toast.error(respText);
                console.log(respText);

                localStorage.removeItem("token");
                navigate("/login");

                return;
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

    useEffect(() => {
        getEmployees();
    }, []);

    return (
        <main className="flex flex-col items-center min-h-screen bg-gray-100">
            <Header />

            <section className="bg-blue-100 h-32 w-full flex justify-between items-center py-4 px-16">
                <h2 className="text-2xl font-semibold">Lista de funcionários</h2>
            </section>
            
            <EmployeesTable employees={employees} />

            <RegisterEmployeeForm onLoadEmployees={getEmployees} />
        </main>
    )
}