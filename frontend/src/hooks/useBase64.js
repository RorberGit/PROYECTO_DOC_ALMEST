export const useBase64 = () => {
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const data = new FileReader();

      data.readAsDataURL(file);

      data.onload = () => {
        const result = data.result;        
        resolve(result);
      };

      data.onerror = (error) => {
        console.error("Error base64", error);
        reject(error);
      };
    });
  };
  return getBase64;
};
