CREATE OR ALTER PROCEDURE insertProduct(@id varchar(255),  @title varchar(255), @description varchar(max), @price money, @image varchar(max), @discountRate Decimal(2,2))
AS
BEGIN
INSERT INTO dbo.products(id,title ,description,price,image , discountRate)
VALUES(@id ,  @title, @description, @price, @image, @discountRate)
END