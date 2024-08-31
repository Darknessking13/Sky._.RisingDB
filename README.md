<div align="center">
  <img src="https://media.discordapp.net/attachments/1276797039778201611/1279453746472030304/standard24-ezgif.com-crop.gif?ex=66d47fa8&is=66d32e28&hm=67dc4cc48e6b923c6de817d8e89acb963a4e2b0a13e38ef53a49746d200edd8c&=&width=611&height=215" alt="sky.db" height="250" />
</div>

<div align="center">
  <a href="https://www.npmjs.com/package/sky.db">
    <img src="https://badgen.now.sh/npm/v/sky.db" alt="version" />
  </a>
  <a href="https://www.npmjs.com/package/sky.db">
    <img src="https://badgen.now.sh/npm/dm/sky.db" alt="downloads" />
  </a>
  <a href="https://packagephobia.now.sh/result?p=sky.db">
    <img src="https://packagephobia.now.sh/badge?p=sky.db" alt="install size" />
  </a>
</div>

<div align="center">🌌 sky.db - The Little Database That Could! 🚀</div>

# Owner
* Discord: [! Ｄᴇᴠɪʟɪѕʜ ｃʜʀᴏɴɪᴄʟᴇѕ](https://discord.com/users/1083342294951927881)
* GitHub: [Darknessking13](https://github.com/Darknessking13)

## Features

* Easy-to-use for creating, saving, and querying data models
* Supports a variety of data types, including strings, numbers, dates, and booleans
* Beginner friendly

## Install
```

$ npm install sky.db@latest 
$ yarn add sky.db@latest 
$ pnpm add sky.db@latest

```

<h2>Getting Started</h2>

To use `sky.db`, simply require the package and define your data models using the `defineModel` function. Here's an example:
```javascript
const skydb = require('sky.db');
const User = skydb.defineModel('./model');

// Create and save a new user
const user1 = new User({
  name: 'Alice',
  age: 30,
  birthdate: new Date('1992-07-12'),
  isActive: true
});

skydb.save(user1);

// Find all active users
const activeUsers = skydb.find(User, { isActive: true });
console.log('Active Users:', activeUsers);
```

<h2>Sky Db info</h2>
sky.db supports the following data types:

- String: A string value, such as a name or description.
- Number: A numeric value, such as an age or score.
- Date: A date value, such as a birthdate or created date.
- Boolean: A boolean value, such as a flag or status.

sky.db supports additional options:

- default: Define default value 
- required: Define using true or false

sky.db saving, querying:

Save data in model
```
const user1 = new User({
    name: 'Alice',
    age: 30,
    isActive: true
});

skydb.save(user1); // Save to default location

```
querying in model:
```javascript 
const skydb = require('sky.db');
const User = skydb.defineModel('./model');


const activeUsers = skydb.find(User, { isActive: true }); // use skydb.find to fetch data from model
console.log('Active Users:', activeUsers);


```

<h2>Examples</h2>

Model:
```javascript
const User = define('User', {
  name: { type: 'string', required: true },
  age: { type: 'number', default: 25 },
  birthdate: { type: 'Date', required: true },
  isActive: { type: 'boolean', default: true }
});

module.exports = { User };
```

# ISC License

- Copyright (c) 2024, i._.become_a_devil

`Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.`
