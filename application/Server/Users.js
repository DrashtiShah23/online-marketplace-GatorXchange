const users = [{
    isGroup: false,
    usersCredentials: [
        {
            name: "Ken",
            email: "ken@pogi.com",
        },
        {
            name: "Vee",
            email: "vee@maganda.com"
        },
    ],
    _id: "7777777777",
    chatName: "ken",
},
{
    isGroup: false,
    usersCredentials: [
        {
            name: "Adele",
            email: "adele@pogi.com",
        },
        {
            name: "Eddy",
            email: "eddy@maganda.com"
        },
    ],
    _id: "88888888",
    chatName: "adele",
}];
let arr_names = []
let arr_room = [0]
for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < users[i].usersCredentials.length; j++) {
        arr_names.push(users[i].usersCredentials[j].name)
    }
}


const addUser = ({ id, name, room }) => {
    name = arr_names[1];
    count += 1

    room = arr_room
    console.log("room: ", room, "name: ", name)

    const existingUser = users.find((user) => user.room === room && user.name === name);

    if (!name || !room) return { error: 'Username and room are required.' };
    if (existingUser) return { error: 'Username is taken.' };

    const user = { id, name, room };

    users.push(user.name);
    console.log("LOOK", user.name);

    if (users.length > 2)
        return { error: 'Should not be more than 2 users in a room' }

    return { user };
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);
module.exports = { addUser, removeUser, getUser, getUsersInRoom, users };