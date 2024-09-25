import React from 'react';

import type { ParkInt } from '../interfaces/ParkInt';
import { createPark } from '../api/parkAPI.js';
// import type { Trip } from '../interfaces/Trip';
// import auth from '../utils/auth';


// Define the props for the component
interface ParkListProps {
    parks: ParkInt[] | null; // users can be an array of UserData objects or null
}


const TrailList: React.FC<ParkListProps> = ({ parks }) => {
    // const [trips, setTrips] = useState<Trip[]>([]);


    const handleAddToTrips = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>,parkName: string,parkURL: string,parkDescription: string,parkState: string,parkImage: string) => {
        e.preventDefault();
        // const form = e.currentTarget.closest('form');
        const parkData = {
            username_id: 1,
            name: parkName,
            url: parkURL,
            description: parkDescription,
            states: parkState,
            images: parkImage,
            designation: "National Park"
            // username_id: req.body.username_id,
            // name: req.body.name,
            // url: req.body.url,
            // description: req.body.description,
            // states: req.body.states,
            // designation: req.body.designation,
            // images: req.body.images,
        };

        createPark(parkData);
    }

    return (
        <>
            {parks && parks.map((park) =>
                (
                <div className="row mt-3 mx-3" id="searchResults">
                    <div className="card mt-2">
                        <div className="card-body row">
                            <img className ="col-2 card-img-top" src={park.images} alt="..."/>
                            <div className="col-10" id = "card-info">
                                <h5 className="card-title">Park Name</h5>
                                <form action = "" id = {park.id?.toString()}>
                                    <p className="card-text">
                                        <strong>Park Name:</strong> {park.name} <br />
                                        <strong>Park URL:</strong> {park.url} <br />
                                        <strong>Description:</strong> {park.description} <br />
                                        <strong>State:</strong> {park.states} <br />
                                    </p>

                                    <button className="btn btn-primary" onClick = {(e) => handleAddToTrips(e,park.name,park.url,park.description,park.states,park.images)}>Add To Trips</button>
                                    
                                    {/* <!-- Once added the button will turn grey and text change to added and also disabled--> */}
                                    <a href="#" className="btn btn-secondary disabled">Added</a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default TrailList;
