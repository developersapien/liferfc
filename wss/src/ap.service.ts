import axios from "axios";

class APIService {
  isUserExist: boolean = false;

  constructor() {
    axios.defaults.baseURL = "http://json-server:3000";
  }

  async createUser(id: string, name: string, room: string = "") {
    try {
      const userExist = await this._isUserExist(name);
      if (!userExist) {
        const userCreateResponse = await axios.post("/users", {
          id,
          name,
          room,
        });
        console.log("User Create response", userCreateResponse);
        return userCreateResponse;
      } else {
      }
    } catch (error) {
      console.log("Server Error", error);
    }
  }

  async clearUser(id: string) {
    try {
      const clearUser = await axios.delete(`/users/${id}`);
      return clearUser;
    } catch (error) {}
  }

  async getUserDetail(id: string) {
    try {
      const userDetail = await axios.get(`/users/${id}`);
      return userDetail;
    } catch (error) {}
  }

  async getUsers() {
    try {
      const userList = await axios.get(`/users`);
      return userList;
    } catch (error) {}
  }

  async assignRoom(room: string, uid: string) {
    try {
      const assingUser = await axios
        .patch(`/users/${uid}`, {
          room,
        })
        .catch();
      return assingUser;
    } catch (error) {}
  }

  async removeUserFromRoom(uid: string) {
    try {
      const removeRoom = await axios.patch(`/users/${uid}`, {
        room: "",
      });
      return removeRoom;
    } catch (error) {}
  }

  async _isUserExist(name: string) {
    const isExist = await this.getUsers().then((result) =>
      result?.data.find((user) => user.name === name)
    );
    let isUserExist = false;
    if (isExist) {
      isUserExist = true;
    }
    return isUserExist;
  }
}

export default APIService;