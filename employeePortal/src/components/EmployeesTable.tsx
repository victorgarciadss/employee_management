import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { Employee } from '../interfaces/Employee';

import { FaTrashAlt } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


interface EmployeesTableProps {
    employees: Employee[];
    deleteEmployee: (id: bigint) => void;
}

export function EmployeesTable({ employees, deleteEmployee } : EmployeesTableProps) {

    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    async function handleDeleteEmployee(id: bigint) {

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`${apiUrl}/api/employees/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if(response.status === 200) {
                const respText = await response.text();
                deleteEmployee(id);
                toast.success(respText);
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
        catch(err) {
            console.log(err);
        }
    }

    
    if(!employees || employees.length === 0) {
        return (
            <p className="my-8 text-lg">Nenhum funcionário cadastrado.</p>
        );
    }
    
    return (
        <TableContainer sx={{
            margin: 8,
            display: "flex",
            justifyContent: "center",
            maxWidth: "1400px",
            paddingX: 4
        }}>
            <Table sx={{
                minWidth: 320,
                border: 1
        }}>
            <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Data de admissão</TableCell>
                <TableCell>Salário</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Ações</TableCell>
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
                    <TableCell>
                        <FaTrashAlt style={{ fontSize: 24, cursor: "pointer" }} onClick={() => handleDeleteEmployee(employee.id)}/>
                    </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}