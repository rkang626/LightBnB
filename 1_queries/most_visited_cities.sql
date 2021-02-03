SELECT p.city 
     , count(*) as total_reservations
  FROM reservations r 
  JOIN properties p 
       ON r.property_id = p.id 
 GROUP BY 1
 ORDER BY 2 DESC