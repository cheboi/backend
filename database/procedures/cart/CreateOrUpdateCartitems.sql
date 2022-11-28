CREATE OR ALTER PROCEDURE uspCreateorUpdateCartItem(@id varchar(50), @product_id varchar(50), @image varchar(50), @quantity int, @discountRate decimal(2,2), @product_name varchar(50))
AS
BEGIN
	IF EXISTS(SELECT * FROM dbo.cartTable WHERE id=@id)
		BEGIN
			UPDATE dbo.cartTable SET product_Id=@product_id, image=@image,quantity=@quantity, discountRate=@discountRate, product_name=@product_name WHERE id=@id
		END
		ELSE 
		BEGIN
			 INSERT into dbo.cartTable(id,  product_Id , image,quantity, discountRate ,product_name)
		VALUES(@id,  @product_Id , @image,@quantity, @discountRate ,@product_name)
		END
END