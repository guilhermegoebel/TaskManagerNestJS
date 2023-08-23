import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';

const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '75147118!!@@##',
    database: 'sys-db',
    entities: [join(__dirname, '..', '**', '*.entity.{js,ts}')],
    migrations: [join(__dirname, 'migrations', '*.{js,ts}')],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;