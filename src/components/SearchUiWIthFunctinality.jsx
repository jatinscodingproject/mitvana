'use client'

import { useState, useEffect, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, Transition } from '@headlessui/react'
import { Search, X } from 'lucide-react'

export default function SearchComponent({ products }) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const router = useRouter()

  useEffect(() => {
    if (searchTerm) {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setSuggestions(filteredProducts)
    } else {
      setSuggestions([])
    }
  }, [searchTerm, products])

  const handleSearch = () => {
    if (searchTerm) {
      router.push('/shop')
    }
    setIsOpen(false)
  }

  const handleSuggestionClick = (customUrl) => {
    router.push(customUrl)
    setIsOpen(false)
  }

  return (
    <>
      {/* Search button to open modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <Search className="h-6 w-6" />
      </button>

      {/* Modal Transition */}
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsOpen(false)}
        >
          {/* Overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          {/* Modal content */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 -translate-y-full"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-full"
          >
            <div className="fixed inset-x-0 top-0 z-50 bg-white shadow-lg transform transition-all">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSearch()
                    }}
                    className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={handleSearch}
                    className="ml-2 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <Search className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="ml-2 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Search Suggestions */}
                {suggestions.length > 0 && (
                  <ul className="mt-4 divide-y divide-gray-200">
                    {suggestions.map((product) => (
                      <li key={product.id} className="py-2">
                        <button
                          onClick={() => handleSuggestionClick(product.customUrl)}
                          className="block w-full text-left hover:bg-gray-100 p-2 rounded"
                        >
                          {product.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}
