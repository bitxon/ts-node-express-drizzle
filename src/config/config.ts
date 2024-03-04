import dotenv from "dotenv";

dotenv.config();

interface Env {
  PORT: number;
  DB_URL: string;
}

const config = (): Env => {
  return {
    PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
    DB_URL: process.env.DB_URL ? process.env.DB_URL : "value_not_provided",
  };
};

export default config;
