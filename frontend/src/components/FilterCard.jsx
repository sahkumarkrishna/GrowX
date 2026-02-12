import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { Filter, MapPin, Briefcase, DollarSign } from 'lucide-react'

const filterData = [
  {
    filterType: "Location",
    icon: <MapPin className="h-4 w-4" />,
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    icon: <Briefcase className="h-4 w-4" />,
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    icon: <DollarSign className="h-4 w-4" />,
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
  },
]

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('')
  const dispatch = useDispatch()

  const changeHandler = (value) => {
    setSelectedValue(value)
  }

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue))
  }, [selectedValue])

  return (
    <div className="w-full bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-xl border-2 border-gray-200 sticky top-20">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
          <Filter className="h-4 w-4 text-white" />
        </div>
        <h1 className="font-bold text-lg sm:text-xl text-gray-900">Filter Jobs</h1>
      </div>
      <hr className="mb-4 border-gray-300" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-5">
        {filterData.map((data, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="text-purple-600">{data.icon}</div>
              <h2 className="font-semibold text-base text-gray-900">{data.filterType}</h2>
            </div>
            <div className="space-y-2 pl-6">
              {data.array.map((item, idx) => {
                const itemId = `id-${index}-${idx}`
                return (
                  <div key={itemId} className="flex items-center space-x-2 group">
                    <RadioGroupItem value={item} id={itemId} className="border-2" />
                    <Label 
                      htmlFor={itemId} 
                      className="text-sm text-gray-700 cursor-pointer group-hover:text-purple-600 transition-colors"
                    >
                      {item}
                    </Label>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterCard
