import { useState, ChangeEvent, FormEvent } from "react";
import { Trail } from "../interfaces/Trail";
import TrailList from "./TrailList"
import { ParkInt } from "../interfaces/ParkInt";
import ParkList from "./ParkList";
import { fetchParkByCityName } from "../api/parkAPI";
import { fetchTrailsByCity } from "../api/trailsAPI";



const SearchBar = () => {
    const [searchOption, setSearchOption] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [search, setSearch] = useState<boolean>(false);
    const [trails, setTrails] = useState<Trail[]>([]);
    const [parks, setParks] = useState<ParkInt[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchOption(e.target.value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            //API HERE
            if (searchOption === 'parks') {
                const data = await fetchParkByCityName(searchTerm);
                console.log(data);
                const newParksArray: ParkInt[] =  [];
                let count = 0;
                if (data && Array.isArray(data)){
                    data.map((fetchdata: { fullName: string; url: string; description: string; states: string; designation: string; images: { url: string }[] }) => {
                        const park: ParkInt = {
                            id: count,
                            name: fetchdata.fullName,
                            url: fetchdata.url,
                            description: fetchdata.description,
                            states: fetchdata.states[0],
                            designation: fetchdata.designation,
                            images: fetchdata.images[0].url
                        };
                        count++;
                        newParksArray.push(park);
                    });
                }

                setParks(newParksArray);
                setSearch(true);
            }
            else {
                const data = await fetchTrailsByCity(searchTerm);
                
                const newTrailsArray: Trail[] =  [];
                let count = 0;
                data.data.map((fetchdata: {
                    name: string; city: string; zip: number; address: string; transit: string; desc: string; difficulty: number; surface: string; parking: string; facilities: string; hours: string; satImgURL: string; attractions: [string]; rating: number; ModifiedTime: string; distance: number;
                })  => {
                    const trail: Trail = {
                        id: count,
                        name: fetchdata.name,
                        city: fetchdata.city,
                        zip: fetchdata.zip,
                        address: fetchdata.address,
                        transit: fetchdata.transit,
                        desc: fetchdata.desc,
                        difficulty: fetchdata.difficulty,
                        surface: fetchdata.surface,
                        parking: fetchdata.parking,
                        facilities: fetchdata.facilities,
                        hours: fetchdata.hours,
                        satImgURL: fetchdata.satImgURL,
                        attractions: fetchdata.attractions,
                        rating: fetchdata.rating,
                        ModifiedTime: fetchdata.ModifiedTime,
                        distance: fetchdata.distance
                    };
                    count++;
                    newTrailsArray.push(trail);
                });

                setTrails(newTrailsArray);
                setSearch(true);
            }

            setSearch(true);
        } catch (err) {
            console.error('Failed to search', err);
        }
    };

    return (
        <>
            <div className="d-flex justify-content-center mt-5" id="search">
                <div className="col-md-6 text-center">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input 
                            className="form-control" 
                            type="search" 
                            placeholder="Search" 
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </div>

                        <div className="d-flex justify-content-end mt-2">
                            <div className="form-check form-check-inline">
                                <input                                 className="form-check-input" 
                                    type="radio" 
                                    name="searchOption" 
                                    id="parks" 
                                    value="parks" 
                                    onChange={handleChange}
                                    checked={searchOption === 'parks'} 
                                />
                                <label className="form-check-label" htmlFor="parks">Parks</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="searchOption" 
                                    id="trails" 
                                    value="trails" 
                                    onChange={handleChange}
                                    checked={searchOption === 'trails'}
                                />
                                <label className="form-check-label" htmlFor="trails">Trails</label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {!search ? 
                <>
                    <h3 className="text-center mt-5">Search for parks or trails</h3>
                </>
                : 
                <>
                    {searchOption === 'parks' ? <ParkList parks={parks} /> :
                    <TrailList trails={trails} />}
                </>
        }
        </>
    );
};

export default SearchBar;