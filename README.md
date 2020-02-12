# Beer Hiker  

### A MERN stack application for beer aficionados to discover, save and map routes to breweries all over the US.
### [View App Live](https://beerhiker.herokuapp.com/)

---

## How The App Works

Users must register for an account to log in. Upon login attempt, the email entered is checked against the database to make sure it exists.  The password is then  
check to see if user input is valid in email and password fields
if valid, check mongodb to see if the user exits
if the user exists use bcrypt to compare submitted password with hashed password in database.
if the passwords match json web token is set  
allows user access to protected pages when logged in
remain logged in when user closes or refreshes page
log out - removes token

search takes in city, state, brewery name and brewery type, makes get request to open brewery db api. 
results are displayed and the user will be presented with the name, address, phone number and website for each brewery.  they can select as many as they want to view on a map and click the "map selected" button.  
coods provided from open brewery db will be displayed, since that is how mapbox 




technologies used 

react, react-router and react-bootstrap front end
MongoDB database
express and node back end
node packages
bcryptjs - hash passwords before storing them in db
concurrently - allows the front end and backend to run concurrently on different ports
express - handles routing, requests
jsonwebtoken - authorization
mongoose - interacts with mongodb
passport - used to authenticat requests
passport-jwt - passport strategy for authenticating with a json web token 
validator - used to validate input in forms