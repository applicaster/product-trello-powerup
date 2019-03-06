import * as R from 'ramda';

const pickStatus = async t => {
  const currentListId = await getCurrentListId(t);
  const availStatuses = await getAvailStatuses(t, currentListId);
  const savedStatusId = await t.get(
    'card',
    'shared',
    `list-stat-id-${currentListId}`
  );
  const currentStatus = getValidStatus(savedStatusId, availStatuses);

  const items = R.map(item => {
    return {
      text:
        item.id === currentStatus.id ? `${item.name} (selected)` : item.name,
      callback: t => {
        t.closePopup();
        setStatus(t, item.id);
      }
    };
  })(availStatuses);

  return t.popup({
    title: 'Status',
    items
  });
};

const getCurrentListId = async t => {
  const list = await t.list('all');
  return list.id;
};

const getAvailStatuses = async (t, listId) => {
  const savedStatus = await t.get('board', 'shared', `ls-${listId}`, []);
  return R.append({ name: 'N/A', id: 'N/A' }, savedStatus);
};

const getValidStatus = (savedStatusId, availStatuses) => {
  if (!savedStatusId) return null;
  return R.defaultTo(
    { name: 'N/A', id: 'N/A' },
    R.find(item => item.id === savedStatusId)(availStatuses)
  );
};

const setStatus = async (t, id) => {
  const currentListId = await getCurrentListId(t);
  const availStatuses = await getAvailStatuses(t, currentListId);
  await t.set('card', 'shared', `list-stat-id-${currentListId}`, id);
  return getValidStatus(id, availStatuses);
};

export const createStatusBadges = hideNa => async (t, callback) => {
  const currentListId = await getCurrentListId(t);
  const availStatuses = await getAvailStatuses(t, currentListId);
  const savedStatusId = await t.get(
    'card',
    'shared',
    `list-stat-id-${currentListId}`
  );

  let currentStatus = getValidStatus(savedStatusId, availStatuses);
  if (!currentStatus) {
    currentStatus = await setStatus(t, R.head(availStatuses).id);
  }
  // don't show status if there are no set statuses
  if (availStatuses.length < 2 || (hideNa && currentStatus.id == 'N/A'))
    return [];
  return [
    {
      title: 'status',
      text: currentStatus.name,
      color: currentStatus.color,
      callback: pickStatus
    }
  ];
};

export const listActions = function(t) {
  return t.list('name', 'id').then(function(list) {
    return [
      {
        text: 'Set List Sub Statuses',
        callback: function(t) {
          return t.popup({
            title: `"${list.name}" Statuses`,
            url: './features/sub-statuses/list-sub-statuses-settings.html',
            args: { list },
            height: 278
          });
        }
      }
    ];
  });
};
