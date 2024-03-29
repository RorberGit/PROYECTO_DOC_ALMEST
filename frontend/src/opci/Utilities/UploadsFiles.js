import axios from "axios";
import { RoutesURLRoot } from "../../contants";

export const UploadsFiles = async (files = []) => {
  let formData = new FormData();

  files.forEach((file) => {
    if (file.file) formData.append("files[]", file.file, file.name);
  });

  return await axios.post(
    `${RoutesURLRoot.APIURL}/${RoutesURLRoot.UPLOADS}`,
    formData,
    {
      Headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
