CREATE or ALTER PROCEDURE getProductById(@id varchar(100))
AS
BEGIN
SELECT * FROM dbo.products WHERE id = @id

END