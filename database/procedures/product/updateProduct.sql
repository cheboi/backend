CREATE OR ALTER PROCEDURE updateProduct(@id varchar(255),  @title varchar(50), @description varchar(max), @price money, @image varchar(max), @discountRate Decimal(2,2))
AS
BEGIN

UPDATE dbo.products SET  id=@id, title=@title,description=@description, image=@image, price=@price, discountRate=@discountRate
END