import { useEffect, useState } from "react";
import { Alert, Button, Form, InputGroup, Modal } from "react-bootstrap";

function AddUpdateModal({
  show,
  handleClose,
  modalType,
  itemToUpdate,
  handleAdd,
  handleUpdate,
}) {
  const [itemID, setItemID] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (itemToUpdate && itemToUpdate !== null) {
      setItemID(itemToUpdate.id);
      setItemName(itemToUpdate.name);
      setItemDescription(itemToUpdate.description);
      setItemPrice(itemToUpdate.price);
      setItemQuantity(itemToUpdate.quantity);
    } else {
      setItemID("");
      setItemName("");
      setItemDescription("");
      setItemPrice("");
      setItemQuantity("");
    }
  }, [itemToUpdate]);

  useEffect(() => {
    if (itemID === "") {
      setDisabled(true);
    } else if (itemName === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [itemID, itemName]);

  const resetToDefault = () => {
    if (itemToUpdate !== null) {
      setItemName(itemToUpdate.name);
      setItemDescription(itemToUpdate.description);
      setItemPrice(itemToUpdate.price);
      setItemQuantity(itemToUpdate.quantity);
    } else {
      setItemID("");
      setItemName("");
      setItemDescription("");
      setItemPrice("");
      setItemQuantity("");
    }
  };

  const handleChange = (e) => {
    switch (e.target.id) {
      case "formBasicID":
        setItemID(e.target.value);
        break;

      case "formBasicName":
        setItemName(e.target.value);
        break;

      case "formBasicDescription":
        setItemDescription(e.target.value);
        break;

      case "formBasicPrice":
        setItemPrice(Number(e.target.value));
        break;

      case "formBasicQuanity":
        setItemQuantity(Number(e.target.value));
        break;

      default:
        break;
    }
  };

  const handleInlineCheck = () => {};

  return (
    <Modal
      show={show}
      onHide={() => {
        handleClose();
        resetToDefault();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {(modalType === "update" && "Update Item") || "Add Item"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body data-testid="modal">
        <Alert variant="info">
          Mandatory fields are marked : <span style={{ color: "red" }}>*</span>
        </Alert>

        <Form>
          <Form.Group className="mb-3" controlId="formBasicID">
            {(modalType === "update" && (
              <Form.Label>
                Item ID<span style={{ color: "red" }}>*</span> (read-only)
              </Form.Label>
            )) || (
              <Form.Label>
                Item ID<span style={{ color: "red" }}>*</span>
              </Form.Label>
            )}

            <InputGroup className="mb-2">
              <InputGroup.Text>#</InputGroup.Text>
              <Form.Control
                data-testid="itemID"
                type="number"
                placeholder="Enter item ID"
                value={itemID}
                onChange={handleChange}
                {...((modalType === "update" && { readOnly: true }) || {
                  readOnly: false,
                })}
              />
            </InputGroup>
            <Form.Text className="text-muted">
              Unique numerical identifier
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>
              Item Name<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              data-testid="itemName"
              type="text"
              placeholder="Name"
              value={itemName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Item Description</Form.Label>
            <Form.Control
              data-testid="itemDesc"
              type="text"
              placeholder="Description"
              value={itemDescription}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPrice">
            <Form.Label>Item Price</Form.Label>

            <InputGroup className="mb-2">
              <InputGroup.Text>₹</InputGroup.Text>
              <Form.Control
                data-testid="itemPrice"
                type="number"
                placeholder="Price"
                value={itemPrice}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicQuanity">
            <Form.Label>Item Quantity</Form.Label>
            <Form.Control
              data-testid="itemQuantity"
              type="number"
              placeholder="Quantity"
              value={itemQuantity}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          data-testid="cancelBtn"
          type="button"
          variant="secondary"
          onClick={() => {
            handleClose();
            resetToDefault();
          }}
        >
          Cancel
        </Button>
        <Button
          data-testid="applyBtn"
          type="submit"
          variant="primary"
          disabled={disabled}
          onClick={() => {
            handleClose();
            resetToDefault();

            modalType === "update" &&
              handleUpdate({
                id: itemID,
                name: itemName,
                description: itemDescription,
                price: itemPrice,
                quantity: itemQuantity,
              });

            modalType === "add" &&
              handleAdd({
                id: itemID,
                name: itemName,
                description: itemDescription,
                price: itemPrice,
                quantity: itemQuantity,
              });

            modalType === "add" && handleInlineCheck();
          }}
        >
          {(modalType === "update" && "Update") || "Add"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddUpdateModal;
