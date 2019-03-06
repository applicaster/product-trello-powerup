import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const t = window.TrelloPowerUp.iframe();
const colors = window.TrelloPowerUp.util.colors;

const Status = ({ color, name, id, getData, currentListId, isDefault }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div
        style={{
          flex: 1,
          borderRadius: 3,
          minHeight: 34,
          backgroundColor: colors.namedColorStringToHex(color),
          marginBottom: 4
        }}
      >
        <div style={{ color: '#fff', padding: 8 }}>
          {isDefault ? `${name} (Default)` : name}
        </div>
      </div>
      <a
        onClick={() => {
          return t.popup({
            callback: getData,
            title: 'Edit Sub Status',
            url: './create-sub-status.html',
            args: { list: currentListId, id },
            height: 278
          });
        }}
        href="#"
        className="quiet-button"
        style={{ marginLeft: 3 }}
      >
        Edit
      </a>
    </div>
  );
};

const App = () => {
  const currentListId = t.arg('list').id;
  const getData = () => {
    t.get('board', 'shared', `ls-${currentListId}`, []).then(data => {
      setStatuses(data);
    });
  };

  const [statuses, setStatuses] = useState([]);
  useEffect(getData, [statuses.length]);

  return (
    <div>
      <div>
        {statuses.map((status, index) => (
          <Status
            key={status.id}
            color={status.color}
            name={status.name}
            id={status.id}
            getData={getData}
            currentListId={currentListId}
            isDefault={index === 0}
          />
        ))}
      </div>
      <a
        href="#"
        className="quiet-button"
        onClick={() => {
          return t.popup({
            callback: getData,
            title: 'Create Sub Status',
            url: './create-sub-status.html',
            args: { list: currentListId },
            height: 278
          });
        }}
      >
        Create a new sub status
      </a>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
