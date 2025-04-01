import React from 'react';

const ButtonDropdown = ({ IconB, text, onClick }) => {
    return (
        <button
            className="group flex items-center justify-between w-[45px] h-[45px] rounded-full overflow-hidden relative transition-all duration-300 shadow-md bg-(--primary-blue) cursor-pointer border-none hover:w-[260px] hover:rounded-[40px] active:translate-x-0.5 active:translate-y-0.5"
            onClick={onClick}
        >

            {/* Icon */}
            <div className="w-full transition-all duration-300 flex items-center justify-center group-hover:w-[25%] group-hover:pl-5">
                <IconB className="w-[17px] fill-white" />
            </div>

            {/* Text */}
            <div className="absolute right-0 w-0 opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:opacity-100 group-hover:w-[75%] group-hover:pr-4">
                {text}
            </div>
        </button>
    );
}

export default ButtonDropdown;
