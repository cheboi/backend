CREATE or ALTER PROCEDURE getCartItem(@id varchar(50))
AS
BEGIN
SELECT * FROM dbo.cartTable WHERE id = @id

END