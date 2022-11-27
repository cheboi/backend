CREATE PROCEDURE getUser (@email VARCHAR(50), @password)
AS
BEGIN
SELECT * FROM UserTable WHERE email = @email AND password=@password
END