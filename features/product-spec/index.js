import axios from 'axios';

const productSpecCreatorUrl = process.env.GSCRIPT;

const getDoc = async t => {
  const card = await t.card('all');

  return await axios.get(productSpecCreatorUrl, {
    params: {
      action: 'checkForDoc',
      id: card.id
    }
  });
};

const createDoc = async t => {
  const card = await t.card('all');
  return await axios.get(productSpecCreatorUrl, {
    params: {
      action: 'createDoc',
      id: card.id,
      name: card.name,
      url: encodeURI(card.url)
    }
  });
};

export const createProductSpecBadges = async t => {
  const title = 'Product Spec';
  const { data } = await getDoc(t);

  if (data.alternateLink) {
    return [
      {
        title,
        color: 'green',
        text: 'Go To Product Spec',
        url: data.alternateLink
      }
    ];
  }

  return [
    {
      title,
      text: 'Attach Product Spec',
      callback: async t => {
        await createDoc(t);
        // We set a local variable to force card update
        await t.set('card', 'shared', 'update', Math.random());
      }
    }
  ];
};
