import { createContext, useContext, useState } from "react";

const JobsContext = createContext();

export const useJobsContext = () => useContext(JobsContext);


const JobsProvider = ({ children }) => {
    const [jobs, setJobs] = useState([]);
    const [displayJob, setDisplayJob] = useState(null);

    const setJob = (data) => {
        setJobs([data, ...jobs]);
    }

    const setCurrentJobToDisplay = (id) => {
        setDisplayJob(id);
    }

    return (
        <JobsContext.Provider value={{ jobs, setJob, setCurrentJobToDisplay, displayJob, setJobs }}>
            {children}
        </JobsContext.Provider>
    )

}

export default JobsProvider;