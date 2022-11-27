CREATE TABLE userTable (
email varchar(50),
first_name varchar(50),
last_name varchar(50) ,
username varchar(50),
password varchar(50),
);

ALTER TABLE userTable
DROP COLUMN id ;

drop table userTable;


CREATE OR ALTER PROCEDURE addUser(@first_name varchar(50),@last_name varchar(50), @email VARCHAR(50), @username VARCHAR(50),@password VARCHAR(50))
AS
BEGIN
INSERT INTO UserTable (email,first_name, last_name, username, password) VALUES(@first_name,@last_name,@email, @username,@password)

END

CREATE OR ALTER PROCEDURE getUser (@email VARCHAR(50))
AS
BEGIN
SELECT * FROM UserTable WHERE email = @email
END


CREATE OR ALTER PROCEDURE getProductById(@id VARCHAR(50))
AS
BEGIN
SELECT * FROM productTable WHERE id= @id

END

SELECT * FROM userTable;
select * from dbo.products;

CREATE TABLE cartTable (
id varchar(50),
product_Id varchar(50),
image varchar(50) ,
quantity int,
discountRate decimal(2,2),
product_name varchar(50),
);
