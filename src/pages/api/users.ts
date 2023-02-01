import { NextApiHandler } from "next";

const users = [
  {
    id: 1,
    name: "Jonny Graham",
    username: "Bret",
    email: "Sincere@april.biz",
  },
  {
    id: 2,
    name: "Steve Howlette",
    username: "Antonette",
    email: "Shanna@melissa.tv",
  },
  {
    id: 3,
    name: "Clancy Bobancy",
    username: "Samantha",
    email: "Nathan@yesenia.net",
  },
  {
    id: 4,
    name: "Patrick Pumpernickel",
    username: "Karianne",
    email: "Julianne.OConner@kory.org",
  },
  {
    id: 5,
    name: "Mandrake the Magnificent",
    username: "Kamren",
    email: "Lucio_Hettinger@annie.ca",
  },
  {
    id: 6,
    name: "Leopoldo Corkery",
    username: "Leopoldo_Corkery",
    email: "Karley_Dach@jasper.info",
  },
  {
    id: 7,
    name: "Lily Clarillion",
    username: "Elwyn.Skiles",
    email: "Telly.Hoeger@billy.biz",
  },
  {
    id: 8,
    name: "Joe Sunshine the Third",
    username: "Maxime_Nienow",
    email: "Sherwood@rosamond.me",
  },
  {
    id: 9,
    name: "Lilith Sanderson",
    username: "Delphine",
    email: "Chaim_McDermott@dana.io",
  },
  {
    id: 10,
    name: "Ako Viewson",
    username: "Moriah.Stanton",
    email: "Rey.Padberg@karina.biz",
  },
];

const handler: NextApiHandler = (req, res) => {
  if (req.query && req.query["q"] && typeof req.query["q"] === "string") {
    const term = req.query["q"];
    const filteredUsers = users.filter((user) => {
      return (
        user.name.toLowerCase().includes(term.toLowerCase()) ||
        user.username.toLowerCase().includes(term.toLowerCase()) ||
        user.email.toLowerCase().includes(term.toLowerCase())
      );
    });
    res.status(200).json(filteredUsers);
  } else {
    res.status(200).json(users);
  }
};

export default handler;
