CREATE PROCEDURE addUser(@first_name varchar(255),@last_name varchar(255), @email VARCHAR(255), @username VARCHAR(50),@password VARCHAR(50))
AS
BEGIN
INSERT INTO UserTable (first_name, last_name, email,username, password) VALUES(@first_name,@last_name,@email, @username,@password)

END