function getDistance(point1, point2) {
  const dx = Math.abs(point1.x - point2.x);
  const dy = Math.abs(point1.y - point2.y);
  return Math.sqrt(dx * dx + dy * dy);
}

function findRideHome(persons, unwellCount) {
  let rideHome = [];

  persons.forEach(person => {
    const distances = persons
      .filter(p => p.name !== person.name)
      .map(p => ({
        name: p.name,
        distance: getDistance(person.location, p.location)
      })); 
    distances.sort((a, b) => a.distance - b.distance); 
    const closest = distances.slice(0, unwellCount).map(p => p.name);
   rideHome.push(closest[0]);
  });

  return rideHome;
}

// Define the persons and their locations
let numberPerson = [1, 2, 3, 4, 5];

let persons = numberPerson.map(numberPerson => {
  return {
    name: `person${numberPerson}`,
    location: {
      x: Math.round(Math.random() * 1000),
      y: Math.round(Math.random() * 1000)
    }
  };
});

console.log( persons);  

const unwellCount = 2;
const rideHome = findRideHome(persons, unwellCount);
  
// Print the result
if (rideHome.length === 1) {
  console.log(`${rideHome[0]} should give a ride home.`);
} else if (rideHome.length === 2) {
  console.log(`${rideHome[0]} and ${rideHome[1]} should give a ride home.`);
} else {
  console.log('No one needs a ride home.');
}
