import cors from 'cors';

const corsOptions = {
    origin: 'http://localhost:5173', 
  };
  
 const configurations = cors(corsOptions)

 export default configurations
  