import React, { memo } from 'react'
import { IconType } from 'react-icons'

interface FilterModalProps {
  iconBefore?: IconType
  iconAfter?: IconType
  text: string
}
const FilterItems: React.FC<FilterModalProps> = ({ iconBefore: IconBefore, iconAfter: IconAfter, text }) => {
  return (
    <div className='bg-white px-4 py-2 w-[208px] rounded-md text-gray-500 flex items-center justify-between'>
      <div className='flex items-center gap-2 w-full'>
        {IconBefore && <IconBefore />}
        <span className='w-full overflow-hidden text-ellipsis whitespace-nowrap'>{text}</span>
      </div>
      {IconAfter && <IconAfter />}
    </div>
  )
}

export default memo(FilterItems)