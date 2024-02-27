import dotenv from "dotenv";

dotenv.config();

interface ENV {
  PORT: number;
  DB_URL: string;
}

const getConfig = (): ENV => {
  return {
    PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
    DB_URL: process.env.DB_URL ? process.env.DB_URL : "value_not_provided",
  };
};

export default getConfig();
