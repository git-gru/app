import socketIO from "socket.io-client";

class Socket {
  socket = null;

  constructor() {
    this.socket = socketIO.connect("http://localhost:5050");

    this.setActivities = null;

    this.addRowHandler = this.addRowHandler.bind(this);
    this.deleteRowHandler = this.deleteRowHandler.bind(this);

    this.socket.on("greet_from_user", (msg) => {
      console.log(msg);
    });
    this.socket.on("add_row", this.addRowHandler);
    this.socket.on("delete_row", this.deleteRowHandler);
  }

  addRow(data) {
    this.socket.emit("add_row", data);
  }

  addRowHandler(data) {
    console.log(data);
    if (typeof this.setActivities === "function")
      this.setActivities((prev) => [...prev, data]);
  }

  deleteRow(data) {
    this.socket.emit("delete_row", data);
  }

  deleteRowHandler(data) {
    console.log(data);
    if (typeof this.setActivities === "function")
      this.setActivities((prev) => prev.filter(({ _id }) => _id !== data.id));
  }

  setActivitiesHandler(handler) {
    this.setActivities = handler;
  }
}

const socket = new Socket();

export default socket;
