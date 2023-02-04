import { config } from 'dotenv';
import { AppDataSource } from './ormconfig';

config();

export const databaseProvider = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = AppDataSource;
      return dataSource.initialize();
    },
  },
];
