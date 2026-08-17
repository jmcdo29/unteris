WITH deitiesWithImages AS (
SELECT 
    d.id as deity_id
    , d.name as deity_name
    , i.id as image_id
    , i.original_url as image_url
FROM deity d
JOIN image i
    ON i.original_url LIKE '%' || REPLACE(LOWER(d.name), ' ', '_') || '%'
)
UPDATE deity 
SET 
    image_id = deitiesWithImages.image_id
FROM deitiesWithImages
WHERE
    id = deitiesWithImages.deity_id;
