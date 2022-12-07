CREATE PROCEDURE uspUpdateProducts(
@id varchar(100),  @name varchar(50), @description varchar(250), @price money, @imageURL image, @discountRate int,
@StatementType VARCHAR(200)=''
)
AS
BEGIN
IF @StatementType = 'createProduct'

        BEGIN

        INSERT into dbo.products(id,  name , description, price, imageURL , discountRate)
		VALUES(@id,  @name , @description, @price, @imageURL , @discountRate)

        END

Else IF @StatementType = 'editProduct'
    BEGIN
  UPDATE dbo.products SET  id=@id, name=@name,description=@description, imageURL=@imageURL, price=@price, discountRate=@discountRate
    WHERE id=@id
    END
END