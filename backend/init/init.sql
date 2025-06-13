USE [master];
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'Gym')
BEGIN
    CREATE DATABASE Gym;
END
GO

RESTORE DATABASE Gym
FROM DISK = '/init/Gym.bak'
WITH
    MOVE 'Gym' TO '/var/opt/mssql/data/Gym.mdf',
    MOVE 'Gym_log' TO '/var/opt/mssql/data/Gym_log.ldf',
    REPLACE;
GO