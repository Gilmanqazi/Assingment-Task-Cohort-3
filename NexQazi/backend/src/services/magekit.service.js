import imageKit from "imagekit"
import CONFIG from "../config/config.js"


const imagekit = new imageKit({
  publicKey:CONFIG.IMAGEKIT_PUBLIC_KEY,
  privateKey:CONFIG.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint:CONFIG.IMAGEKIT_URL_ENDPOINT
})

export const uploadToImageKit = async (fileBuffer,fileName)=>{
try {

  const response = await imagekit.upload({
    file:fileBuffer,
    fileName:fileName,
    folder:"/NexQazi"
  })

  return response
  
} catch (error) {
  throw new Error(`ImageKit Upload Failed: ${error.message}`);
}
}

export const deleteFromImageKit = async (fileId)=>{
try {

  const response = await imagekit.deleteFile(fileId)
  return response
  
} catch (error) {
  console.error("ImageKit delete error:", error);
  throw new Error(`ImageKit Upload Failed: ${error.message}`);

}
}