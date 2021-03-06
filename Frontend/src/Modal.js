import React, { Component } from "react";
import { ModalTitle } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class MyModal extends Component {
  // Modal includes edit an existing task and add a new task
  // Its in 'add new task mode' if the modalCharacter is null
  // otherwise its 'edit existing task mode'

  initialState = {
    task: "",
    desc: "",
    priority: "0",
    date: "",
    checked: false,
    type: "",
  };
  state = this.initialState;

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  componentDidUpdate({ _id }) {
    // if a new character is given, change the state
    if (
      this.props.modalCharacter &&
      this.props.modalCharacter._id !== this.state._id
    ) {
      this.setState({ task: this.props.modalCharacter.task });
      this.setState({ desc: this.props.modalCharacter.desc });
      this.setState({ priority: this.props.modalCharacter.priority });
      this.setState({ type: this.props.modalCharacter.type });
      this.setState({ date: this.props.modalCharacter.date });
      this.setState({ _id: this.props.modalCharacter._id });
    }
  }

  submitForm = () => {
    let nPriority = parseInt(this.state.priority);
    if (nPriority !== NaN && nPriority >= 0 && nPriority <= 10) {
      // Check that the priority is valid
      if (this.props.modalCharacter) {
        var modChar = this.props.modalCharacter;
        modChar.task = this.state.task;
        modChar.desc = this.state.desc;
        modChar.priority = this.state.priority;
        modChar.type = this.state.type;
        modChar.date = this.state.date;
        this.props.handleModalSubmit(modChar);
        this.setState(this.initialState);
      } else {
        alert("Priority must be a number from 1 to 10.");
      }
    }
  };

  render = () => {
    let defaultType = (
      <option selected disabled>
        Please choose...
      </option>
    );

    // set currently selected type
    if (this.state.type) {
      // if type is already selected
      defaultType = (
        <option selected name="type" id="type" value={this.state.type}>
          {this.state.type}
        </option>
      );
    } // Not ideal, the selected option will be repeated in the table twice

    // set the title of modal TODO
    let modalTitle = "Edit Task"
    if (this.props.modalCharacter === this.initialState) {
      modalTitle = "Add Task"
    }

    return (
      <Modal show={this.props.show} onHide={this.props.closeModal}>
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="task">Task</label>
          <input
            type="text"
            name="task"
            id="task"
            value={this.state.task}
            onChange={this.handleChange}
          />

          <label htmlFor="desc">Description</label>
          <input
            type="text"
            name="desc"
            id="desc"
            value={this.state.desc}
            onChange={this.handleChange}
          />

          <label htmlFor="date">Due Date (optional)</label>
          <input
            type="date"
            name="date"
            id="date"
            value={this.state.date}
            onChange={this.handleChange}
          />

          <label htmlFor="type">Type</label>
          <select name="type" onChange={this.handleChange}>
            {defaultType}
            <option name="type" id="type" value="School">
              School
            </option>
            <option name="type" id="type" value="Work">
              Work
            </option>
            <option name="type" id="type" value="Errand">
              Errand
            </option>
            <option name="type" id="type" value="House Work">
              House Work
            </option>
            <option name="type" id="type" value="Other">
              Other
            </option>
          </select>

          <label htmlFor="priority">Priority (Number 0-10)</label>
          <div className="slider-parent">
            <input
              type="range"
              name="priority"
              id="priority"
              min="0"
              max="10"
              steps="1"
              value={this.state.priority}
              onChange={this.handleChange}
            />
            <output>{this.state.priority}</output>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={this.submitForm}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
}

export default MyModal;