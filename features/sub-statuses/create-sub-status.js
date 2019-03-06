import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import check from './check.svg';
import * as R from 'ramda';
import * as shortid from 'shortid';

const t = window.TrelloPowerUp.iframe();
const colors = window.TrelloPowerUp.util.colors;

const availColors = [
  'blue',
  'green',
  'orange',
  'red',
  'yellow',
  'purple',
  'pink',
  'sky',
  'lime'
];

const ColorBtn = ({ color, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 48,
        backgroundColor: colors.namedColorStringToHex(color),
        borderRadius: 4,
        marginRight: 8,
        marginBottom: 8
      }}
    >
      {active && (
        <div
          style={{
            position: 'absolute',
            background: `url(${check})`,
            width: 24,
            height: 24
          }}
        />
      )}
    </div>
  );
};

const App = () => {
  const editId = t.arg('id');
  const currentListId = t.getContext().list;

  const [selectedColor, setColor] = useState(availColors[0]);
  const [statusName, setSatatusName] = useState('');

  useEffect(() => {
    t.get('board', 'shared', `ls-${currentListId}`, []).then(data => {
      const editItem = R.find(R.propEq('id', editId))(data);
      if (editId) {
        setColor(editItem.color);
        setSatatusName(editItem.name);
      }
    });
  }, []);

  const handleChange = event => {
    setSatatusName(event.target.value);
  };

  return (
    <div>
      <label>Name</label>
      <input type="text" onChange={handleChange} value={statusName} />
      <label>Select Color</label>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {availColors.map(availColor => (
          <ColorBtn
            onClick={() => {
              setColor(availColor);
            }}
            key={availColor}
            color={availColor}
            active={selectedColor === availColor}
          />
        ))}
      </div>
      <button
        onClick={() => {
          const currentListId = t.getContext().list;

          t.get('board', 'shared', `ls-${currentListId}`, []).then(data => {
            const newValue = R.ifElse(
              R.always(editId),
              data => {
                const index = R.findIndex(R.propEq('id', editId))(data);

                return R.over(
                  R.lensIndex(index),
                  R.always({
                    id: editId,
                    name: statusName,
                    color: selectedColor
                  })
                )(data);
              },
              R.append({
                id: shortid.generate(),
                name: statusName,
                color: selectedColor
              })
            )(data);

            t.set('board', 'shared', `ls-${currentListId}`, newValue).then(
              () => {
                t.notifyParent('done');
                t.back();
              }
            );
          });
        }}
        className="mod-primary"
      >
        {editId ? 'Update' : 'Create'}
      </button>
      <button
        className="mod-danger"
        onClick={() => {
          const currentListId = t.getContext().list;
          t.get('board', 'shared', `ls-${currentListId}`, []).then(data => {
            t.set(
              'board',
              'shared',
              `ls-${currentListId}`,
              R.reject(status => status.id === editId, data)
            ).then(() => {
              t.notifyParent('done');
              t.back();
            });
          });
        }}
      >
        Delete
      </button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
