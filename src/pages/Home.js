import React, { useState, useEffect } from "react";
import { baseUrl } from "../config";

export default function App() {
  let [activities, setActivities] = useState([]);

  useEffect(() => {
    const loadActivities = async () => {
      let results = await fetch(`${baseUrl}/activities`).then((resp) =>
        resp.json()
      );
      setActivities(results);
    };

    loadActivities();
  }, []);

  const deleteActivity = async (id) => {
    await fetch(`${baseUrl}/activities/${id}`, { method: "DELETE" });
    setActivities(activities.filter((activity) => activity._id !== id));
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
      </div>
    </React.Fragment>
  );
}
