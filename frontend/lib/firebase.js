// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadString,
  deleteObject,
} from "firebase/storage";
import fs from "fs";
import { v4 } from "uuid";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const apiKey = import.meta.env.FIREBASE_API_KEY;
const authDomain = import.meta.env.FIREBASE_AUTH_DOMAIN;
const projectId = import.meta.env.FIREBASE_PROJECT_ID;
const storageBucket = import.meta.env.FIREBASE_STORAGE_BUCKET;
const messagingSenderId = import.meta.env.FIREBASE_MESSAGING_SENDER_ID;
const appId = import.meta.env.FIREBASE_APP_ID;
const measurementId = import.meta.env.FIREBASE_MEASUREMENT_ID;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJZHXq-yWfQ2sAZXjHb-Awyh0k7xPhh_w",
  authDomain: "aneupi-a05ed.firebaseapp.com",
  projectId: "aneupi-a05ed",
  storageBucket: "aneupi-a05ed.appspot.com",
  messagingSenderId: "233603558691",
  appId: "1:233603558691:web:7f32da03f6bc1ee90db096",
  measurementId: "G-MX2TX4G4WH",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const uploadEventImage = async (fileData) => {
  try {
    // const filePath = fileData.path;
    // const fileBuffer = fs.readFileSync(filePath);
    console.log("fileData", fileData);
    const storageRef = ref(storage, `eventos/imagenes/${v4()}`);
    await uploadBytes(storageRef, fileData, {
      contentType: "image/jpeg || image/png",
    });
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("Error ", error);
    throw error;
  }
};

export const getFileNameFromUrl = (url) => {
  // Crea un objeto URL desde el string
  let parsedUrl = new URL(url);
  // Obtén la parte del camino del URL
  let pathname = parsedUrl.pathname;
  // Decodifica el componente de la URI para reemplazar %2F con /
  let decodedPath = decodeURIComponent(pathname);
  // Divide la cadena en "/" y obtén la última parte
  let fileName = decodedPath.split("/").pop();
  return fileName;
};

export const deleteFile = async (imageUrl, path) => {
  try {
    const fileName = getFileNameFromUrl(imageUrl);

    const storageRef = ref(storage, `${path}${fileName}`);
    await deleteObject(storageRef);
    return true;
  } catch (error) {
    console.error("Error ", error);
    throw error;
  }
};

export const uploadProfileImage = async (imageData) => {
  try {
    const storageRef = ref(storage, `profileImages/${v4()}`);
    await uploadString(storageRef, imageData, "data_url");
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error("Error uploading profile pic:", error);
    throw error;
  }
};

export const uploadCurriculum = async (fileData) => {
  try {
    const filePath = fileData.path;
    const fileBuffer = fs.readFileSync(filePath);

    const storageRef = ref(storage, `ponentes/curriculumFiles/${v4()}`);
    await uploadBytes(storageRef, fileBuffer, {
      contentType: "application/pdf",
    });
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("Error ", error);
    throw error;
  }
};

export const uploadCertificate = async (fileData) => {
  try {
    const filePath = fileData.path;
    const fileBuffer = fs.readFileSync(filePath);

    const storageRef = ref(
      storage,
      `asistentes/certificadoDiscapacidadFiles/${v4()}`
    );
    await uploadBytes(storageRef, fileBuffer, {
      contentType: "application/pdf",
    });
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("Error ", error);
    throw error;
  }
};

export const uploadComprobante = async (fileData, isPonente) => {
  try {
    const filePath = fileData.path;
    const fileBuffer = fs.readFileSync(filePath);

    const storageRef = ref(
      storage,
      `${isPonente ? "ponentes/" : "asistentes/"}comprobanteFiles/${v4()}`
    );
    await uploadBytes(storageRef, fileBuffer, {
      contentType: "application/pdf",
    });
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("Error ", error);
    throw error;
  }
};

// Export the functions
