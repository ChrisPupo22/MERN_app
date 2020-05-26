import React from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from 'react-router-dom'; 

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world",
    imageUrl: "https://www.kitano.com/resourcefiles/snippet-main-img/empire-state-building-in-new-york-top.jpg", 
    address: "20 W 34th St, New York, NY 10001",
    location: {
        lat: 40.7484405,
        lon: -73.9878584
    },
    creator: 'u1' 
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world",
    imageUrl: "https://www.kitano.com/resourcefiles/snippet-main-img/empire-state-building-in-new-york-top.jpg", 
    address: "20 W 34th St, New York, NY 10001",
    location: {
        lat: 40.7484405,
        lon: -73.9878584
    },
    creator: 'u2' 
  }
];

const UserPlaces = () => {
  const userId = useParams().userId; 
  const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId); 
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
