import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { PrivateArea } from "./layout/PrivateArea";
import { Dashboard } from "./pages/Dashboard";

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route path="/" element={<PrivateArea />}>
                    <Route index element={<Dashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}