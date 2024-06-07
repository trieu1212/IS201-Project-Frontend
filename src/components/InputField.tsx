import React from 'react'
interface InputFieldProps {
    data:string|number|boolean|any,
    setData : React.Dispatch<React.SetStateAction<string|number|boolean|any>>
    placeholder?:string
    type?:string,
    disabled?:boolean
}
const InputField:React.FC<InputFieldProps> = ({data,setData,placeholder,type,disabled}) => {
  return (
    <>
        <div>
            <input 
                className='border rounded-md p-2 w-[400px]'
                type={type?type:'text'}
                placeholder={placeholder}
                value={data}
                onChange={(e)=>setData(e.target.value)}
                disabled={disabled===true?true:false}
            />
        </div>
    </>
  )
}

export default InputField