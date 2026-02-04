import { Calendar, Grid3x3, Sprout } from 'lucide-react';

export default function Home() {
  return (
    <div className='space-y-8'>
      <div className='text-center py-8'>
        <h1 className='text-4xl font-bold text-green-800 mb-4'>
          Welcome to Smart Garden Planner
        </h1>
        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
          Plan, manage, and visualize your perfect garden. Get planting dates, track
          growth, and optimize your space efficiently.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-white p-6 rounded-xl shadow-lg'>
          <div className='text-green-600 mb-4'>
            <Calendar className='h-12 w-12' />
          </div>
          <h3 className='text-xl font-semibold mb-2'>Calendar Planning</h3>
          <p className='text-gray-600'>
            Track sowing, planting, and harvesting dates with our interactive calendar.
          </p>
        </div>

        <div className='bg-white p-6 rounded-xl shadow-lg'>
          <div className='text-green-600 mb-4'>
            <Grid3x3 className='h-12 w-12' />
          </div>
          <h3 className='text-xl font-semibold mb-2'>Garden Layout</h3>
          <p className='text-gray-600'>
            Drag and drop plants to design your optimal garden layout.
          </p>
        </div>

        <div className='bg-white p-6 rounded-xl shadow-lg'>
          <div className='text-green-600 mb-4'>
            <Sprout className='h-12 w-12' />
          </div>
          <h3 className='text-xl font-semibold mb-2'>Plant Database</h3>
          <p className='text-gray-600'>
            Access detailed information about various vegetables and their requirements.
          </p>
        </div>
      </div>
    </div>
  );
}
