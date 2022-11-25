CREATE PROCEDURE insertProduct(@id varchar(100),  @name varchar(50), @description varchar(250), @price money, @imageURL image, @discountRate int)
AS
BEGIN
INSERT INTO dbo.products(id,  name , description, price, imageURL , discountRate)
VALUES(@id ,  @name, @description, @price, @imageURL, @discountRate)
END