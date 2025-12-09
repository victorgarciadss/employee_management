export interface Employee {
    id: bigint;
    name: string;
    admissionDate: Date;
    salary: number;
    status: "Ativo" | "Inativo";
}