select p.*
     , avg(rating) as average_rating
  from properties p
  left join property_reviews r
       on p.id = r.property_id 
 where city ilike '%ancouve%'
 group by p.id
having avg(rating) >= 4
 order by cost_per_night asc
 limit 10