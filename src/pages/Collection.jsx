  import React, { useContext } from 'react'
  import { ShopContext } from '../context/ShopContext'
  import { assetss } from '../assets/frontend_assets/assetss';
  const Collection = () => {
    const {products} = useContext(ShopContext);
    const [showFilter, setShowFilter] = React.useState(true);
    return (
      <div className='flex  flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
        {/* Filter Options */}
        <div className='min-w-60'>
          <p  onClick={()=>setShowFilter(!showFilter)}  className=' my-2 text-xl flex items-center cursor-pointer gap-2'>
            FILTERS
            <img className={`h-3 sm:hidden  ${showFilter ? 'rotate-90' :''}`} src={assetss.dropdown_icon} />
          </p>

          {/* Category Options */}
          <div className={` border border-gray-300 pb-4 pl-4 mt-6 ${showFilter ? '' : 'hidden'}`}>
            <p className='mb-3 text-sm font-medium mt-3'>
              CATEGORIES
            </p>
            <div className='flex flex-col  text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input type="checkbox" className='mt-0.9' value={'Men'} /> Men
              </p>
              <p className='flex gap-2'>
                <input type="checkbox" className='mt-0.9' value={'Woman'}/> Woman
              </p>
              <p className='flex gap-2'>
                <input type="checkbox" className='mt-0.9' value={'Kids'} /> Kids
              </p>
            </div>
          </div>

          <div className={` border border-gray-300 pb-4 pl-4 mt-6 ${showFilter ? '' : 'hidden'}`}>
            <p className='mb-3 mt-3 text-sm font-medium'>
              TYPE
            </p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input type="checkbox" className='mt-0.9' value={'TopWear'} /> TopWear
              </p>
              <p className='flex gap-2'>
                <input type="checkbox" className='mt-0.9' value={'BottomWear'}/> BottomWear
              </p>
              <p className='flex gap-2'>
                <input type="checkbox" className='mt-0.9' value={'WinterWear'} /> WinterWear
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  export default Collection