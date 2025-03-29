import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized! Please log in.");
      navigate("/");
      return;
    }
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (page) => {
    try {
      const res = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(res.data.data);
      setTotalPages(res.data.total_pages);
    } catch (error) {
      toast.error("Error fetching users.");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-center mb-6">User List</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {users.map((user) => (
          <Card key={user.id} className="p-4 text-center">
            <img src={user.avatar} alt={user.first_name} className="w-20 h-20 mx-auto rounded-full mb-2" />
            <h3 className="text-lg font-bold">{user.first_name} {user.last_name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </Card>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-4 mt-6">
        <Button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          Previous
        </Button>
        <span className="text-lg font-semibold">{page} / {totalPages}</span>
        <Button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default UserList;
