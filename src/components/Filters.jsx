import { useEffect, useState } from "react";
import { BiDownArrowAlt } from 'react-icons/bi'
import Filter from './Filter'


/*

    Upload Date,
    Distance,
    Type [full time, contract, part time]
    Salary Estimate[15000+, 25000+, 50000+ 100000+] / month
    Experience level [Entry, Intermediate, Senior]


*/
const Filters = ({ queryParams, setQueryParams }) => {

    const [buttonClicked, setButtonClicked] = useState(false);
    const [filterOpen, setFilterOpen] = useState(0);

    const handleChange = (name, val) => {
        // setFilterValues({ ...filterValues, [name]: val })
        setQueryParams({ ...queryParams, [name]: val })
    }

    return (
        <>
            <button className={`m-auto flex items-center bg-light-color pl-4 py-2 gap-2 pr-2 mt-4 rounded-sm font-mono ${buttonClicked ? 'text-dark-color' : 'text-gray-500'} hover:text-dark-color`} onClick={() => setButtonClicked(!buttonClicked)}>
                <p>Filters</p>
                <BiDownArrowAlt className={`fill-accent-color transition-all ${buttonClicked && 'rotate-180'}`} />
            </button>
            {
                <div className={`m-auto w-7/12 mt-2 flex flex-wrap gap-2 ${buttonClicked ? 'block' : 'hidden'}`}>
                    <Filter data={{
                        name: 'Upload Date',
                        displayValues: ["Last 24 hours", "Last 7 days", "Last month"],
                        values: [24, 168, 720]
                    }} filterOpen={filterOpen} setFilterOpen={setFilterOpen} handleChange={handleChange} />
                    <Filter data={{
                        name: 'Distance',
                        displayValues: ["Within 10km", "Within 30km", "Within 100km"],
                        values: [10, 30, 100]
                    }} filterOpen={filterOpen} setFilterOpen={setFilterOpen} handleChange={handleChange} />
                    <Filter data={{
                        name: 'Type',
                        displayValues: ['Full time', 'Part time', 'Contract'],
                        values: ["Full time", "Part time", "Contract"]
                    }} filterOpen={filterOpen} setFilterOpen={setFilterOpen} handleChange={handleChange} />
                    <Filter data={{
                        name: 'Salary Estimate',
                        displayValues: [`$300+`, '$500+', '$1000+', '$2000+'],
                        values: [300, 500, 1000, 2000]
                    }} filterOpen={filterOpen} setFilterOpen={setFilterOpen} handleChange={handleChange} />
                    <Filter data={{
                        name: 'Experience Level',
                        values: ["Entry", "Intermediate", "Senior"],
                        displayValues: ["Entry", "Intermediate", "Senior"],
                    }} filterOpen={filterOpen} setFilterOpen={setFilterOpen} handleChange={handleChange} />
                </div>
            }
        </>
    )
}

export default Filters;