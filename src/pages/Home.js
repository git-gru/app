import React, { useState, useEffect } from "react";
import { baseUrl } from "../config";

const Types = {
  Type1: "activity_type_1",
  Type2: "activity_type_2",
  Type3: "activity_type_3",
};

export default function App() {
  let [activities, setActivities] = useState([]);
  let [isShowingModal, setIsShowingModal] = useState(false);
  let [name, setName] = useState("");
  let [type, setType] = useState(Types.Type1);

  useEffect(() => {
    const loadActivities = async () => {
      let results = await fetch(`${baseUrl}/activities`).then((resp) =>
        resp.json()
      );
      setActivities(results);
    };

    loadActivities();
  }, []);

  const addActivity = async () => {
    let uid = Math.random().toString(36).substring(2);
    let userId = "78bf0298-a898-4ed0-a6dd-e6e33001daf9";
    let eventTime = new Date();
    let activity = { uid, name, type, userId, eventTime };
    let results = await fetch(`${baseUrl}/activities`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activity),
    }).then((resp) => resp.json());
    setActivities([...activities, { ...activity, _id: results.insertedId }]);
    closeModal();
  };

  const deleteActivity = async (id) => {
    await fetch(`${baseUrl}/activities/${id}`, { method: "DELETE" });
    setActivities(activities.filter((activity) => activity._id !== id));
  };

  const closeModal = () => {
    setIsShowingModal(false);
    setName("");
    setType(Types.Type1);
  };

  return (
    <React.Fragment>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => {
              return (
                <tr key={activity._id}>
                  <td>{activity.name}</td>
                  <td>{activity.type}</td>
                  <td>
                    <button onClick={() => deleteActivity(activity._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div
          id="myModal"
          className="modal"
          style={{ display: isShowingModal ? "block" : "none" }}
        >
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value={Types.Type1}>{Types.Type1}</option>
              <option value={Types.Type2}>{Types.Type2}</option>
              <option value={Types.Type3}>{Types.Type3}</option>
            </select>
            <button onClick={addActivity}>Save</button>
          </div>
        </div>
        <button onClick={() => setIsShowingModal(true)}>Add</button>
      </div>
    </React.Fragment>
  );
}
