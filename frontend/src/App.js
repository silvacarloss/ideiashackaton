import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      ideiasList: []
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    fetch("http://localhost:8000/ideias/")
    .then(response => response.json())
    .then(data => 
      this.setState({ ideiasList: data })
    )
  }	

  renderItems = () => {
    return this.state.ideiasList.map(ideia => (
      <li key={ideia.id} className="ml-4 mb-2 mt-2">

        {ideia.titulo}
        <span>
          <button
            onClick={() => this.handleDelete(ideia)}
            className="btn btn-danger float-right"
          >
            Delete{" "}
          </button>
          <button
            onClick={() => this.editItem(ideia)}
            className="btn btn-secondary mr-2 ml-2 float-right"
          >
            {" "}
            Edit{" "}
          </button>
        </span>
      </li>
    ))
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8000/ideias/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    axios
      .post("http://localhost:8000/ideias/", item)
      .then(res => this.refreshList());
  };

  handleDelete = item => {
    axios
      .delete(`http://localhost:8000/ideias/${item.id}`)
      .then(res => this.refreshList());
  };

  createItem = () => {
    const item = { titulo: "", descricao: "" };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  render() {
    return (
      <main className="content">
        <h1 className="text-black text-uppercase text-center my-4">Ideias app</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createItem} className="btn btn-primary mb-3">
                  Nova ideia
                </button>
              </div>
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default App;