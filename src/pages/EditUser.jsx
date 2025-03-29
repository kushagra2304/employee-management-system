import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EditUser() {
    const { id } = useParams();
    const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/users/${id}`)
            .then((res) => {
                setUser(res.data.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    const handleUpdate = () => {
        api.put(`/users/${id}`, user)
            .then(() => {
                alert("User updated successfully!");
                navigate("/users");
            })
            .catch(() => alert("Error updating user."));
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="p-6 w-full max-w-md space-y-4">
                <h1 className="text-xl font-bold">Edit User</h1>
                {loading ? <p>Loading...</p> : (
                    <>
                        <Input value={user.first_name} onChange={(e) => setUser({ ...user, first_name: e.target.value })} placeholder="First Name" />
                        <Input value={user.last_name} onChange={(e) => setUser({ ...user, last_name: e.target.value })} placeholder="Last Name" />
                        <Input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="Email" />
                        <Button onClick={handleUpdate} className="w-full">Update</Button>
                    </>
                )}
            </Card>
        </div>
    );
}
