import "./App.css";
import axios from "axios";
import { useEffect ,useState } from "react";


const App = () => {
  const [name, setName] = useState("");
  const [prn, setPrn] = useState("");
  const [batch, setBatch] = useState("");

  const [students, setStudents] = useState([]);
  const [refreshTable, setRefreshTable] = useState(false);
  const [editActive, setEditActive] = useState(false);
  const [target, setTarget] = useState({}); // target is the student which we want to edit

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !prn || !batch) {
      alert("Please fill all the details");
      return;
    }

    try {
      if (editActive) {
        // Edit existing student
        await axios.put(`http://localhost:3001/${target.prn}`, { name, batch });
      } else {
        // Add new student
        await axios.post("http://localhost:3001/", { name, prn, batch });
      }
      setName("");
      setPrn("");
      setBatch("");
      setRefreshTable(true);
      setEditActive(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStudents = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/");
      setStudents(data["Students Registered"]);
      setRefreshTable(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = (prn) => {
    const selectedStudent = students.find((student) => student.prn === prn);
    setName(selectedStudent.name);
    setPrn(selectedStudent.prn);
    setBatch(selectedStudent.batch);
    setTarget(selectedStudent);
    setEditActive(true);
  };

  const deleteStudent = async (prn) => {
    try {
      confirm("Are you sure you want to delete this student?") ? await axios.delete(`http://localhost:3001/${prn}`) : null;
    
      setRefreshTable(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchStudents();
  },[refreshTable]);      // instead of refreshTable we can also use students as a dependency

  return (
    <>
      <form action="submit" className="form">
        <h2>Add Student Details</h2>
        <h3 htmlFor="Name: "> Name: </h3>
        <input
          type="text"
          className="input-field"
          value={name}                             
          onChange={ (e) => setName(e.target.value)}
        />

        <h3 htmlFor="PRN: ">PRN: </h3>
        <input
          { ...editActive && {disabled: true} }
          type="Number"
          className="input-field"
          value={prn}
          onChange={ (e) => setPrn(e.target.value)}
        />

        <h3 htmlFor="Batch: ">Batch: </h3>
        <input
          type="text"
          value={ batch}
          className="input-field"
          onChange={ (e) => setBatch(e.target.value)}
        />
        <button onClick={handleSubmit} className="edit"> { editActive? "Save" : "Submit"} </button>
      </form>
        <h2> Registered Students </h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>PRN</th>
            <th>Batch</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.prn}</td>
              <td>{student.batch}</td>
              <td>
                <button onClick={()=> handleEdit(student.prn)} className="edit">Edit</button>
                <button onClick={()=> deleteStudent(student.prn)} className="delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        

      </> 
    );
  };

export default App;
