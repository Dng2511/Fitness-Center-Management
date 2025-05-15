USE [master];
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'Gym')
BEGIN
    CREATE DATABASE Gym;
END
GO
