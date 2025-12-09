import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import type { Employee } from '../interfaces/Employee';
import { toast } from 'react-toastify';



export function EmployeesTable() {
    
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
        <TableContainer sx={{
            margin: 8,
            display: "flex",
            justifyContent: "center"
        }}>
            <Table sx={{
                minWidth: 320,
                maxWidth: 1000,
                border: 1
        }}>
            <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Data de admissão</TableCell>
                <TableCell>Salário</TableCell>
                <TableCell>Status</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {employees.map((employee) => (
                <TableRow
                    key={employee.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell>{employee.id}</TableCell>
                    <TableCell >{employee.name}</TableCell>
                    <TableCell >{new Date(`${employee.admissionDate}T00:00:00`).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell >{employee.salary.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</TableCell>
                    <TableCell >{employee.status}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}