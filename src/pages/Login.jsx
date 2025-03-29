import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await api.post("/login", { email, password });
            localStorage.setItem("token", res.data.token);
            navigate("/users");
        } catch (err) {
            setError("Invalid Credentials");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <Card className="p-6 w-full max-w-sm space-y-4">
                <h1 className="text-xl font-bold">Login</h1>
                {error && <p className="text-red-500">{error}</p>}
                <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={handleLogin} className="w-full">Login</Button>
            </Card>
        </div>
    );
}
