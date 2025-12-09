import { useEffect, useState } from "react";
import { EmployeesTable } from "../components/EmployeesTable";
import { Header } from "../components/Header";
import { RegisterEmployeeForm } from "../components/RegisterEmployeeForm";
import type { Employee } from "../interfaces/Employee";
import { toast } from "react-toastify";

export function Dashboard() {

    const [employees, setEmployees] = useState<Employee[]>([]);
    const token = localStorage.getItem("token");

    async function getEmployees() {
        try {
            const response = await fetch("http://localhost:8080/api/employees", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();
            console.log(data);

            if(!response.ok) {
                toast.error("Erro ao buscar funcionários");
                console.log(data);
                return;
            }

            setEmployees(data);

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