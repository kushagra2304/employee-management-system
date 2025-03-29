import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function UserCard({ user }) {
    const navigate = useNavigate();

    return (
        <Card className="p-4 flex flex-col items-center space-y-3">
            <img src={user.avatar} alt={user.first_name} className="w-16 h-16 rounded-full" />
            <h2 className="text-lg font-bold">{user.first_name} {user.last_name}</h2>
            <p>{user.email}</p>
            <Button onClick={() => navigate(`/edit/${user.id}`)}>Edit</Button>
        </Card>
    );
}
