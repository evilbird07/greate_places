import * as FileSystem from "expo-file-system";
import { insertPlace } from "../helpers/db";

export const ADD_PLACE = "ADD_PLACE";

export const addPlace = (title, image) => {
  return async (dispatch) => {
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;
    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      // store data in database
      const dbResult = await insertPlace(
        title,
        newPath,
        "Dummy address",
        15.6,
        12.9
      );
      console.log(dbResult);

      // dispatch only if  both are true
      dispatch({
        type: ADD_PLACE,
        placeData: { id: dbResult.insertId, title: title, image: newPath },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
