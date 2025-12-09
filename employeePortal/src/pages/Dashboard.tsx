import { EmployeesTable } from "../components/EmployeesTable";
import { Header } from "../components/Header";

export function Dashboard() {

    return (
        <main className="flex flex-col items-center min-h-screen bg-gray-100">
            <Header />

            <section className="bg-blue-100 h-32 w-full flex justify-between items-center py-4 px-16">
                <h2 className="text-2xl font-semibold">Lista de funcionários</h2>
                <button className="bg-white text-base rounded-lg p-4 cursor-pointer">Cadastrar novo funcionário</button>
            </section>
            
            <EmployeesTable />
        </main>
    )
}