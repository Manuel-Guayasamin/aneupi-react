// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadString,
  deleteObject,
} = require("firebase/storage");
const fs = require("fs");
const { v4 } = require("uuid");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// const uploadEventImage = async (imageData) => {
//   try {
//     console.log(imageData);
//     const storageRef = ref(storage, `skillImages/${v4()}`);
//     await uploadString(storageRef, imageData, "data_url");
//     const url = await getDownloadURL(storageRef);
//     return url;
//   } catch (error) {
//     console.error("Error uploading profile pic:", error);
//     throw error;
//   }
// };

const uploadEventImage = async (fileData) => {
  try {
    const filePath = fileData.path;
    const fileBuffer = fs.readFileSync(filePath);

    const storageRef = ref(storage, `eventos/imagenes/${v4()}`);
    await uploadBytes(storageRef, fileBuffer, {
      contentType: "image/jpeg || image/png",
    });
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("Error ", error);
    throw error;
  }
};

const getFileNameFromUrl = (url) => {
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

const deleteFile = async (imageUrl, path) => {
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

const uploadProfileImage = async (imageData) => {
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

const uploadCurriculum = async (fileData) => {
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

const uploadCertificate = async (fileData) => {
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

const uploadComprobante = async (fileData, isPonente) => {
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

// Convenios
const uploadConvenio = async (fileData) => {
  try {
    const filePath = fileData.path;
    const fileBuffer = fs.readFileSync(filePath);

    const storageRef = ref(storage, `convenios/convenioFiles/${v4()}`);
    await uploadBytes(storageRef, fileBuffer, {
      contentType: "application/pdf",
    });
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("Error ", error);
    throw error;
  }
};

// Curriculum de postulaciones a prácticas y trabajos
const uploadCurriculumPostulaciones = async (fileData) => {
  try {
    const filePath = fileData.path;
    const fileBuffer = fs.readFileSync(filePath);

    const storageRef = ref(storage, `postulaciones/curriculumFiles/${v4()}`);
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
module.exports = {
  app,
  storage,
  uploadEventImage,
  uploadProfileImage,
  uploadCurriculum,
  uploadComprobante,
  uploadCertificate,
  deleteFile,
  uploadConvenio,
  uploadCurriculumPostulaciones
};
