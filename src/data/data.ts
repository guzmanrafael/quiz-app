export default [
  {
    id: '1tfjiELNrwYAJeafRYlT9RwOIiD',
    name: 'Grace Hopper',
  },
  {
    id: '1tfjiFoinFrbdLWlPI52dRLhNlD',
    name: 'Yoshitake Miura',
  },
  {
    id: '1tfjiDIAS8f2UYgV9ynCqWi7rZD',
    name: 'Ada Lovelace',
  },
].map((winner, position) => ({ ...winner, position }));
