import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

const activeUsers = [];

const getUserRoom = async (id) => {
  try {
    const response = await axios.get(`/users/${id}`);
    return response.data.room;
  } catch (error) {}
};

const getUserDetail = async () => {
  try {
    const userDetail = await axios.get(`/users`);
    return userDetail;
  } catch (error) {}
};

const addPlayerToRoom = async (id, username, room) => {
  try {
    const getActivePlayers = await axios.get(`/rooms/${id}`);
    const activePlayer = getActivePlayers?.data?.players;

    const response = await axios.patch(`/rooms/${id}`, {
      players: [...activePlayer, id],
    });
    return response;
  } catch (error) {
    //console.log("Errorsasasasas", error);
  }
};

const assingRoomToPlayer = async (id, roomName) => {
  try {
    const response = await axios.patch(`/users/${id}`, {
      room: roomName,
    });
    return response;
  } catch (error) {}
};

/* Check if user Exists */
const isUserExist = (name: string): boolean => {
  let isExist;
  getUserDetail().then((result) => {
    if (result?.data.find((user) => user.name === name)) {
      isExist = true;
    } else {
      isExist = false;
    }
  });
  console.log("isExost", isExist);
  return isExist;
};

const createUser = async (id, name, room) => {
  console.log("userStatis", isUserExist(name));
  try {
    const response = await axios.post("/users", {
      id,
      name,
      room,
    });
    return response;
  } catch (error) {}
};

const clearUser = async (id) => {
  try {
    const response = await axios.delete(`/users/${id}`);
    return response;
  } catch (error) {}
};

export {
  getUserRoom,
  addPlayerToRoom,
  assingRoomToPlayer,
  createUser,
  clearUser,
};
