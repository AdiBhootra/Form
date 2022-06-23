import { usersAction } from "../feature/UserSlice";

export const fetchApiData = () => {
  return async (dispatch: any) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) {
        throw new Error("Could not fetch api data!");
      }
      const data = await response.json();

      return data;
    };

    try {
      const apiData = await fetchData();
      dispatch(usersAction.apiData(apiData));
    } catch (error) {
      console.log(error);
    }
  };
};
