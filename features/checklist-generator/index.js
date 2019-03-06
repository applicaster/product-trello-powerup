import axios from 'axios';

export const addChecklist = async ({ t, key, name, items }) => {
  const token = await t.getRestApi().authorize({ scope: 'read,write' });
  const cardId = t.getContext().card;
  const { data: checklist } = await axios.post(
    'https://api.trello.com/1/checklists',
    {
      idCard: cardId,
      name,
      key,
      token
    }
  );

  for (const item of items) {
    await axios.post(
      `https://api.trello.com/1/checklists/${checklist.id}/checkItems`,
      {
        idCard: cardId,
        name: item,
        key,
        token
      }
    );
  }
};
