const CLOUD_URL = `https://api.cloudinary.com/v1_1/dfitgcp0o/raw/upload`; 
const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "PeerBridge");

  const response = await fetch(CLOUD_URL, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  console.log("Upload response:", data);
  return data;
};

export default uploadFile;
