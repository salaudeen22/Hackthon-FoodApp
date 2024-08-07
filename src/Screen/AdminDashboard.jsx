import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { Nav, Modal, Button, Table } from "react-bootstrap";
import AddCompanyForm from "../Components/AddCompanyForm";
import UpdateCompanyForm from "../Components/UpdateCompanyForm";
import "bootstrap/dist/css/bootstrap.min.css";

function AdminDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [updateShowModal, setUpdateShowModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setUpdateShowModal(false);
    setSelectedCompany(null);
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/allCompanies");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);
  const auth = localStorage.getItem("authtoken");
  const handleRowClick = (company) => {
    setSelectedCompany(company);
    setUpdateShowModal(true);
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authtoken");
    navigate("/login");
  };
  return (
    <div>
    <Navbar expand="lg" bg="success" className="d-flex justify-content-lg-between">
      <Navbar.Brand as={Link} to="#" className="fs-4 fst-italic text-white">
        HackFood
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse id="navbarNav">
        <Nav className="ml-auto">
          {!auth ? (
            <div className="d-flex flex-xl-row flex-md-column">
              <Link className="btn bg-white text-success mx-1 mt-1" to="/login">
                Login
              </Link>
              <Link className="btn bg-white text-success mx-1 mt-1" to="/createuser">
                SignUp
              </Link>
            </div>
          ) : (
            <Button className="bg-white text-danger mx-2" onClick={handleLogout}>
              LogOut
            </Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    
    {auth && (
      <>
        <div className="d-flex justify-content-end mt-2" style={{ zIndex: 9, position: "relative" }}>
          <Button variant="success" className="text-white mx-1" onClick={handleShow}>
            Add Company
          </Button>
        </div>

        <Modal show={showModal} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Add Restaurant Company</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddCompanyForm />
          </Modal.Body>
        </Modal>

        <Modal show={updateShowModal} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Update Restaurant Company</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedCompany && <UpdateCompanyForm company={selectedCompany} />}
          </Modal.Body>
        </Modal>

        <div className="table-responsive mt-3">
          <Table striped bordered hover className="custom-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company._id} onClick={() => handleRowClick(company)} className="table-row">
                  <td>{company.name}</td>
                  <td>{company.address}</td>
                  <td>{company.phone}</td>
                  <td>{company.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </>
    )}
  </div>
  );
}

export default AdminDashboard;
