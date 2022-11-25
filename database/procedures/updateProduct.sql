CREATE PROCEDURE updateProduct(@id varchar(100),  @name varchar(50), @description varchar(250), @price money, @imageURL image, @discountRate int)
AS
BEGIN

UPDATE dbo.products SET  id=@id, name=@name,description=@description, imageURL=@imageURL, price=@price, discountRate=@discountRate
END