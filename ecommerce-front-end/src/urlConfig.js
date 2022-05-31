export const api = process.env.REACT_APP_API_URL;

export const domain = process.env.REACT_APP_DOMAIN;

export const generatePublicUrl = (fileName) => {
    return `http://localhost:2000/public/${fileName}`;
}