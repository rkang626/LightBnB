select p.*
     , r.*
     , avg(pr.rating) as average_rating
  from reservations r 
  join properties p
       on r.property_id = p.id
  join property_reviews pr 
       on p.id = pr.property_id 
 where r.guest_id = 1
   and r.end_date < now()::date 
 group by p.id, r.id
 order by r.start_date asc
 limit 10