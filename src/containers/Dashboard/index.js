import React, { useEffect, useState } from "react";
import { Button, Table, Alert, Spinner, ButtonGroup } from "react-bootstrap";

import Modal from "../../components/Modal";

import "./styles.css";

function Dashboard() {
  const [itemsResponse, setItemsResponse] = useState(null);
  const [itemsErrors, setItemsErrors] = useState(false);

  const [itemDeleteErrors, setItemDeleteErrors] = useState(false);
  const [itemUpdateErrors, setItemupdateErrors] = useState(false);

  const [itemAddResponse, setItemAddResponse] = useState(false);
  const [itemAddErrors, setItemAddErrors] = useState(false);

  const [modalType, setModalType] = useState(null);
  const [itemToUpdate, setItemToUpdate] = useState(null);

  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (action, item) => {
    setShow(true);
    setModalType(action);
    setItemToUpdate(item);
  };

  const fetchItems = () => {
    fetch("http://localhost:3001/items")
      .then((response) => response.json())
      .then((response) => {
        setItemsResponse(response);
        setItemsErrors(false);
      })
      .catch(() => {
        setItemsResponse(null);
        setItemsErrors(true);
      });
  };

  const handleAdd = (item) => {
    fetch("http://localhost:3001/items", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        quantity: item.quantity,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setItemAddResponse(response);
        setItemAddErrors(false);
      })
      .then(() => fetchItems())
      .catch((err) => {
        setItemAddResponse("Duplicate ID");
        setItemAddErrors(true);
      });
  };

  const handleDelete = (item) => {
    fetch("http://localhost:3001/items/" + item.id, { method: "DELETE" })
      .then(() => {
        setItemDeleteErrors(false);
      })
      .then(() => fetchItems())
      .catch(() => {
        setItemDeleteErrors(true);
      });
  };

  const handleUpdate = (updatedItem) => {
    fetch("http://localhost:3001/items/" + updatedItem.id, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: updatedItem.id,
        name: updatedItem.name,
        description: updatedItem.description,
        price: updatedItem.price,
        quantity: updatedItem.quantity,
      }),
    })
      .then(() => {
        setItemupdateErrors(false);
      })
      .then(() => fetchItems())
      .catch(() => {
        setItemupdateErrors(true);
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (
      (itemsErrors && itemsResponse === null) ||
      (itemAddErrors && itemAddResponse) ||
      itemDeleteErrors ||
      itemUpdateErrors
    ) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [
    itemsErrors,
    itemsResponse,
    itemAddErrors,
    itemAddResponse,
    itemDeleteErrors,
    itemUpdateErrors,
  ]);

  return (
    <div className="Dashboard">
      <h1>Inventory</h1>

      <Modal
        {...{
          show,
          handleClose,
          modalType,
          itemToUpdate,
          handleAdd,
          handleUpdate,
        }}
      ></Modal>

      {showAlert && (
        <Alert onClose={() => setShowAlert(false)} dismissible variant="danger">
          {itemAddErrors
            ? itemAddResponse.toString()
            : "An Error Occurred! Sorry!"}
        </Alert>
      )}

      {(itemsResponse && !itemsErrors && (
        <>
          <Button
            className="addBtn"
            variant="primary"
            onClick={() => handleShow("add", null)}
          >
            Add Item
          </Button>
          <Table className="table" bordered hover>
            <thead>
              <tr>
                <th>Action</th>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {itemsResponse.map((item) => (
                <tr key={item.id}>
                  <td className="btnGrp">
                    <ButtonGroup>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(item)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="warning"
                        onClick={() => handleShow("update", item)}
                      >
                        Update
                      </Button>
                    </ButtonGroup>
                  </td>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.price && item.price + "₹"}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Button className="addBtnMobile" variant="primary">
            Add Item
          </Button>
        </>
      )) || (
        <div className="loader">
          <Spinner className="spinner" animation="border" variant="primary" />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
