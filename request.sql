SELECT produits_name, shops_name, shops_adresse, brands_name
FROM (produits NATURAL JOIN produits_to_shops NATURAL JOIN shops NATURAL JOIN brands);                   
 
