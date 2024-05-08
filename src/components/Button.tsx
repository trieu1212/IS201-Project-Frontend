import React from 'react'
import { IconType } from 'react-icons'
interface ButtonProps {
    name:string,
    style?:string
    iconBefore?:IconType,
    iconAfter?:IconType
    handleSubmit?:()=>void
}
const Button:React.FC<ButtonProps> = ({name,style,iconBefore:IconBefore,iconAfter:IconAfter,handleSubmit}) => {
    return (
        <div>
            <button 
                className={style}
                onClick={handleSubmit}
            >
                {IconBefore && <IconBefore size={20} className='mr-2'/>}
                {name}
                {IconAfter && <IconAfter size={20} className='ml-2'/>}
            </button>
        </div>
    )
}

export default Button