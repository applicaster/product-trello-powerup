import { listActions, createStatusBadges } from './features/sub-statuses';
import { addChecklist } from './features/checklist-generator';
import { createProductSpecBadges } from './features/product-spec';
import * as R from 'ramda';

const appKey = process.env.APP_KEY;

const checklistItemsCoreRollout = [
  'QA approved',
  'Updated on Product-Info-Hub',
  'Support training',
  'Zendesk docs',
  'developer docs (N/A)',
  'feature flag removal (N/A)',
  'Announced on newsletter',
  'Released on stable Android version (N/A)',
  'Release on stable iOS version',
  'Released on stable Samsung version (N/A)',
  'Released on stable TVOS version (N/A)'
];

const checklistItemsPluginRollout = [
  'QA approved',
  'Code is Open Source',
  'Updated on Product-Info-Hub',
  'Updated on Plugin Gallery',
  'Support training',
  'Zendesk docs',
  'Plugin is public',
  'developer docs (N/A)',
  'Announced on newsletter'
];

const checklistItemsGrooming = [
  'The task force performed a kick of meeting for the feature and added a list of development prerequisites to the design doc',
  'High level requirements were adjusted according the input that was given in the kick off meeting',
  'All development prerequisites where implemented'
];

const checklistItemsWishlist = [
  'Provide a clear definition of the problem',
  'Provide info on how we will measure success',
  'Consult and brain storm with a product peer'
];

TrelloPowerUp.initialize(
  {
    'list-actions': listActions,
    'card-detail-badges': async t => {
      const statusBadges = await createStatusBadges()(t);
      const productSpecBadges = await createProductSpecBadges(t);
      return R.concat(statusBadges, productSpecBadges);
    },

    'card-badges': createStatusBadges(true),
    'card-buttons': async (t, ops) => {
      return [
        {
          text: 'Wishlist checklist',
          callback: t =>
            addChecklist({
              t,
              key: appKey,
              name: 'Wishlist',
              items: checklistItemsWishlist
            })
        },
        {
          text: 'Grooming checklist',
          callback: t =>
            addChecklist({
              t,
              key: appKey,
              name: 'Grooming',
              items: checklistItemsGrooming
            })
        },
        {
          text: 'Core Rollout checklist',
          callback: t =>
            addChecklist({
              t,
              key: appKey,
              name: 'Rollout',
              items: checklistItemsCoreRollout
            })
        },
        {
          text: 'Plugin Rollout checklist',
          callback: t =>
            addChecklist({
              t,
              key: appKey,
              name: 'Rollout',
              items: checklistItemsPluginRollout
            })
        }
      ];
    }
  },
  {
    appKey,
    appName: 'features'
  }
);
