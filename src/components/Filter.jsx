import { useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md'
import { ImCross } from 'react-icons/im'
import { BsCurrencyEuro } from 'react-icons/bs'


const Filter = ({ data, filterOpen, setFilterOpen, handleChange }) => {
    const [buttonClicked, setButtonClicked] = useState(false)
    const [displayValue, setDisplayValue] = useState(null);

    const handleFunc = (e) => {
        let name = e.target.getAttribute('name');
        let val = e.target.getAttribute('data-value');
        // handles the logic
        handleChange(name, val)


        // handle ui
        let text = e.target.innerText;
        setDisplayValue(text);
    }

    return (
        <div className={`relative flex items-center  gap-2 bg-light-color px-4 py-2 rounded-md select-none ${displayValue && 'bg-slate-400'} hover:cursor-pointer`} onClick={(e) => {
            if (displayValue) {
                setDisplayValue(null)

                const name = e.target.children[1].children[0].getAttribute('name');
                handleChange(name, null)
            }
            else
                setButtonClicked(!buttonClicked)
        }}>
            {displayValue || data.name}
            {displayValue ? <ImCross size='0.5rem' /> : <MdArrowDropDown />}

            {
                <div className={` ${buttonClicked ? 'block' : 'hidden'} absolute left-0 top-12 z-50 bg-white shadow-md rounded-sm border-[1px] border-slate-200`}>


                    {data.values.map((val, index) => <p className='flex items-center w-full min-w-max px-4 hover:cursor-pointer hover:bg-slate-200' name={data.name.split(/\s+/).join('')} onClick={handleFunc} key={data.name + `${index}`} data-value={val}> {data.displayValues[index]}</p>)}
                    {/* {data.name === 'Salary Estimate' && (<BsCurrencyEuro size='0.8rem' />)} */}


                </div>
            }
        </div>
    )
}

export default Filter;