import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:4200',
};

const configurations = cors(corsOptions)

export default configurations
