CREATE OR ALTER PROCEDURE deleteCartItem(@id varchar(50))
AS
BEGIN
	IF EXISTS(SELECT * FROM dbo.cartTable WHERE id=@id)
		BEGIN
			UPDATE dbo.cartTable SET isDeleted=1 WHERE id=@id
		END
		ELSE
		BEGIN
			RAISERROR ('No item at the moment',11,1)
		END
END