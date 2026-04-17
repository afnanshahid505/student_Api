import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  const token = localStorage.getItem("token");

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/students",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudents(response.data);
    } catch (error) {
      alert("Failed to fetch students");
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Teacher Dashboard 🎓
        </h1>

        <button
          onClick={handleLogout}
          className="bg-black text-white px-5 py-2 rounded-xl hover:opacity-90"
        >
          Logout
        </button>
      </div>

      {/* Students Card */}
      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Students List
        </h2>

        {students.length === 0 ? (
          <p className="text-gray-500">
            No students found.
          </p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">S.No</th>
                <th className="text-left py-3">Student Name</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student, index) => (
                <tr key={student._id} className="border-b">
                  <td className="py-3">{index + 1}</td>
                  <td className="py-3">{student.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}