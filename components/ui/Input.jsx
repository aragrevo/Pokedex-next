export function Input({label, value, onChange}) {
  return (
    <div className='relative z-0 w-full mb-4 group'>
      <input
        type='text'
        value={value}
        onChange={onChange}
        className='block py-2.5 px-3 w-full text-sm text-gray-900 
              bg-clip-padding
              border border-solid border-gray-300 
              rounded
      transition
      ease-in-out
      z-0
      m-0
      bg-white focus:outline-none focus:ring-0 focus:border-blue-600 peer'
        id={label}
        placeholder=' '
      />
      <label
        htmlFor='no'
        className='z-10 pb-6 rounded peer-focus:font-medium absolute text-gray-700 duration-300 transform -translate-y-8 translate-x-3 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 '>
        {label}
      </label>
    </div>
  );
}
