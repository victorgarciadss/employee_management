import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { PrivateArea } from "./layout/PrivateArea";
import { Dashboard } from "./pages/Dashboard";
import { EditEmployee } from "./pages/EditEmployee";

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route path="/" element={<PrivateArea />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/edit" element={<EditEmployee />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}