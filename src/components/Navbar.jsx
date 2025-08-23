import React from 'react'

const Navbar = () => {
  return (
   <nav className="flex justify-between bg-black text-white py-9 shadow-lg">
  <div className="logo">
    <span className="font-bold text-xl mx-8 text-yellow-500">itask</span>
  </div>
  <ul className="flex gap-8 mx-9">
    <li className="cursor-pointer hover:text-yellow-400 transition-all">Home</li>
    <li className="cursor-pointer hover:text-yellow-400 transition-all">Your Tasks</li>
  </ul>
</nav>

      
    
  )
}

export default Navbar
