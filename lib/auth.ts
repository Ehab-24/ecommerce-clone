import jwt from 'jsonwebtoken'

export const verifyToken = (token: string) => {
  if (!token) {
    return null;
  }
  let decodedData;
  try {
    if (token.length < 500) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET || "");
    } else {
      decodedData = jwt.decode(token);
    }
    return decodedData;
  } catch (error) {
    console.log(error)
    return null;
  }
}
