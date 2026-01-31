const firstNames = [
  'Mostakin',
  'Rahim',
  'Karim',
  'Jahid',
  'Monira',
  'Sadia',
  'Nabil',
  'Taslima',
  'Rafiq',
  'Salma',
];
const lastNames = [
  'Chowdhury',
  'Hossain',
  'Ahmed',
  'Khan',
  'Sultana',
  'Rahman',
  'Islam',
  'Karim',
  'Mia',
  'Akter',
];

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

function generateUniqueEmail(first: string, last: string, id: number) {
  return `${first.toLowerCase()}.${last.toLowerCase()}${id}@example.com`;
}

const users: {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  isstaff: boolean;
  superadmin: boolean;
  created_date: string;
  role: 'Staff' | 'Admin' | 'Customer';
}[] = [];
const usedNames = new Set();

for (let i = 1; i <= 100; i++) {
  let first, last, nameKey;
  do {
    first = firstNames[getRandomInt(firstNames.length)];
    last = lastNames[getRandomInt(lastNames.length)];
    nameKey = first + last;
  } while (usedNames.has(nameKey));

  usedNames.add(nameKey);

  const isstaff = Math.random() > 0.5;
  const superadmin = Math.random() > 0.8;

  users.push({
    id: i,
    firstname: first,
    lastname: last,
    email: generateUniqueEmail(first, last, i),
    phone: `01${Math.floor(10000000 + Math.random() * 90000000)}`,
    isstaff,
    superadmin,
    role: superadmin ? 'Admin' : isstaff ? 'Staff' : 'Customer',
    created_date: `202${getRandomInt(4)}-${(getRandomInt(12) + 1)
      .toString()
      .padStart(2, '0')}-${(getRandomInt(28) + 1).toString().padStart(2, '0')}`,
  });
}

// user roles

export const Userrole = ['All', 'Partner', 'Admin', 'Rider', 'Customer'];

export default users;
