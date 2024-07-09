import React from 'react'

export default function Vendorheaders() {
  return (
    <div>
        
      <nav class="bg-slate-900 py-4 fixed w-full">
        <div class="container mx-auto flex items-center justify-between px-4">
          <div class="text-white">Admin Dashboard</div>
          <div>

            <button class="text-white hover:text-gray-300">Logout</button>
          </div>
        </div>
      </nav>
    </div>
  )
}
