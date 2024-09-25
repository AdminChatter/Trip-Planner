import React, { useState }from 'react';

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
    const [addedParks, setAddedParks] = useState<{ [key: number]: boolean }>({});

    const handleAddToTrips = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, parkId: number, parkName: string, parkURL: string, parkDescription: string, parkState: string, parkImage: string) => {
        e.preventDefault();
        // const form = e.currentTarget.closest('form');
        setAddedParks((prevState) => ({
            ...prevState,
            [parkId]: true
        }));

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
                        <img className="col-2" src={park.images} alt={park.name} style={{ width: '20%', height: 'auto', objectFit: 'cover' }} />
                            <div className="col-10" id = "card-info">
                                <form action = "" id = {park.id?.toString()}>
                                    <p className="card-text">
                                        <strong>Park Name:</strong> {park.name} <br />
                                        <strong>Park URL:</strong> {park.url} <br />
                                        <strong>Description:</strong> {park.description} <br />
                                        <strong>State:</strong> {park.states} <br />
                                    </p>

                                    <button
                                        className={addedParks[park.id!] ? 'btn btn-secondary disabled' : 'btn btn-primary'}
                                        disabled={!!addedParks[park.id!]} // Disable button only if this park has been added
                                        onClick={(e) => handleAddToTrips(e, park.id!, park.name, park.url, park.description, park.states, park.images)}
                                    >
                                            {addedParks[park.id!] ? 'Added' : 'Add to Trip'}
                                    </button>
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
