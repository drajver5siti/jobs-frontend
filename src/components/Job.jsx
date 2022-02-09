import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { MdWork } from 'react-icons/md'
import { useNavigate } from 'react-router';
import { useJobsContext } from "../context/jobs";


const Job = ({ data }) => {

    const { setCurrentJobToDisplay, displayJob, jobs, isSmall } = useJobsContext();
    const navigate = useNavigate();
    const handleJobClick = (e) => {
        if (window.innerWidth >= 768) {
            // if we have two columns just display the job
            setCurrentJobToDisplay(data)
        }
        else {
            // else open the full job in a new window
            navigate(`/jobs/${data._id}`)
        }

    }


    const jobDesc = useRef();

    return (
        <>
            <div ref={jobDesc} className='z-0 font-mono p-2 border-[1px] border-slate-400 rounded-md w-11/12 max-w-2xl text-clip'
                onClick={() => {
                    handleJobClick()
                }}>
                <h2 className='text-3xl font-semibold'>{data?.title}</h2>
                <div className='inline-flex items-center w-max relative'>
                    <p className='bg-slate-200 rounded inline-block pl-2 pr-10 py-1 text-sm'>{data?.type}</p>
                    <MdWork size='1.25rem' className='absolute right-1 fill-slate-600' />
                </div>
                <p className='text-2xl'>{data?.company}</p>
                <p className='text-xl'>{data?.location}</p>
                <p className='w-auto break-words'>{data?.shortDesc}</p>
            </div>
        </>
    )
}
export default Job;
/*

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur error minus deleniti? Nihil rem aperiam laudantium magni perferendis quae facilis, repudiandae optio accusamus, id provident suscipit impedit vero asperiores magnam consequatur odio! Sequi tenetur corrupti eius distinctio esse at nihil eveniet amet praesentium natus nesciunt temporibus blanditiis, reiciendis illo officiis aspernatur quaerat voluptate. Obcaecati corporis laudantium saepe temporibus aliquam explicabo asperiores vel eum facere inventore totam libero, iure architecto quis veritatis nam quisquam, itaque ab natus tempora repellendus quod commodi. Tempora fugit fuga sunt, omnis illo earum saepe, itaque necessitatibus repudiandae eius et? Natus debitis facere voluptates harum magnam totam rem! Velit voluptates magnam id minima necessitatibus perspiciatis maxime libero magni. At nam, eveniet maxime voluptatem ex et, incidunt impedit numquam magnam officiis in dolorem dolore iste animi nemo doloribus mollitia, quos deleniti dolor officia similique. Libero corporis ipsa molestiae dolorum unde inventore qui tempora itaque labore harum numquam consectetur, adipisci blanditiis vel sapiente impedit culpa excepturi enim minima voluptatibus. Ea veritatis voluptatibus, aperiam dolorem, facilis nisi voluptas optio nobis nihil ipsum excepturi quisquam delectus accusantium blanditiis ad ratione sit expedita necessitatibus eligendi sunt sequi iusto eveniet. Reiciendis sint nihil quas eum architecto, repellat, incidunt laborum nulla eius voluptas aperiam nobis inventore. Doloremque sed alias modi facere optio sapiente aut ex fugiat magni. Mollitia facere eligendi adipisci debitis numquam distinctio totam harum, voluptatem, dolore odit alias non itaque incidunt, accusantium eos quas consequuntur asperiores corporis id esse voluptate illo. Esse, labore! Debitis velit odit ullam consequatur blanditiis. Sed earum magnam adipisci ab aperiam aspernatur, beatae eum ratione in doloremque deleniti harum placeat incidunt temporibus ducimus odit! Ea assumenda, minima laboriosam eligendi repellat quod illo iure mollitia quaerat qui soluta. Cum eaque magni enim laboriosam ea. Necessitatibus quae laborum asperiores veniam maxime, reprehenderit amet impedit laboriosam nobis, libero corporis expedita adipisci.
*/