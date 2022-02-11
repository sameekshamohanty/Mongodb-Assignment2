MongoDB -Aggregation Exercises (519942_Sameeksha Mohanty)


Import the zips.json file into your MongoDB. Database name is "population" and collection name is "zipcodes". mongoimport --db population --collection zipcodes --file zips.json


 Atlanta Population 
1. use db.zipcodes.find() to filter results to only the results where city is ATLANTA and state is GA.
 2. use db.zipcodes.aggregate with $match to do the same as above. 
 3. use $group to count the number of zip codes in Atlanta.
 4. use $group to find the total population in Atlanta. 


db.zipcodes.find({city:"ATLANTA", state: "GA"})
db.zipcodes.aggregate([{$match: {city:"ATLANTA", state: "GA"}}])
db.zipcodes.aggregate([{$match:{city:"ATLANTA"}},{$group:{_id:"$city", count:{$sum: 1}}}])
db.zipcodes.aggregate([{$match:{city:"ATLANTA"}},{$group:{_id:"$city", count:{$sum:"$pop"}}}])








Populations By State 
1. use aggregate to calculate the total population for each state 
2. sort the results by population, highest first 
3. limit the results to just the first 3 results. What are the top 3 states in population? 


db.zipcodes.aggregate([{$group:{_id:"$state", TotPopulation:{$sum:"$pop"}}}])
db.zipcodes.aggregate([{$group:{_id:"$state", TotPopulation:{$sum:"$pop"}}}, {$sort:{TotPopulation:-1}}])
db.zipcodes.aggregate([{$group:{_id:"$state", TotPopulation:{$sum:"$pop"}}}, {$sort:{TotPopulation:-1}}, {$limit: 3}])








Populations by City 
1. use aggregate to calculate the total population for each city (you have to use city/state combination). You can use a combination for the _id of the $group: { city: '$city', state: '$state' } 2. sort the results by population, highest first 
3. limit the results to just the first 3 results. What are the top 3 cities in population? 
4. What are the top 3 cities in population in Texas? 


db.zipcodes.aggregate([{$group:{_id:"$city", TotPopulation:{$sum:"$pop"}}}])
db.zipcodes.aggregate([{$group:{_id:"$city", TotPopulation:{$sum:"$pop"}}}, {$sort:{TotPopulation:-1}}])
db.zipcodes.aggregate([{$group:{_id:"$city", TotPopulation:{$sum:"$pop"}}}, {$sort:{TotPopulation:-1}}, {$limit: 3}])
db.zipcodes.aggregate([{$match:{state:"TX"}},{$group:{_id:"$city", TotPopulation:{$sum:"$pop"}}}, {$sort:{TotPopulation:-1}}, {$limit: 3}])
    1)Houston  2)Dallas  3)San Antonio




Bonus 
1. Write a query to get the average city population for each state.
 2. What are the top 3 states in terms of average city population?


db.zipcodes.aggregate([{$group:{_id:"$state", AvgPopulation:{$avg:"$pop"}}}])
db.zipcodes.aggregate([{$group:{_id:"$state", AvgPopulation:{$avg:"$pop"}}}, {$sort:{AvgPopulation:-1}}, {$limit: 3}])
    1)DC   2)CA   3)FL