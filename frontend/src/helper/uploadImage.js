const CLOUD_URL = `https://api.cloudinary.com/v1_1/dfitgcp0o/image/upload`
 const uploadImage = async(file)=>{
    const formData = new FormData(); //
    formData.append("file",file);
    formData.append("upload_preset","PeerBridge");

    const fetchToCloudinary = await fetch(CLOUD_URL,{
        method:"POST",
        body:formData,

    })
    console.log("Fetch to Cloudinary: ",fetchToCloudinary);
    return fetchToCloudinary.json()
}
export default uploadImage;


