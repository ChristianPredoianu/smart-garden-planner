'use client';

import { motion, AnimatePresence } from 'framer-motion';
import PlantCard from '@/components/cards/PlantCard';
import EmptyResults from '@/components/ui/EmptyResults';
import { Plant } from '@/lib/types';

interface PlantCollectionProps {
  plants: Plant[];
  viewMode: 'grid' | 'list';
}

export default function PlantCollection({ plants, viewMode }: PlantCollectionProps) {
  if (plants.length === 0) {
    return (
      <EmptyResults
        title='No plants found'
        description='Try adjusting your search or filters'
      />
    );
  }

  const plantCards = plants.map((plant) => (
    <PlantCard key={plant.id} plant={plant} compact={viewMode === 'list'} />
  ));

  return (
    <AnimatePresence mode='wait'>
      {viewMode === 'grid' ? (
        <motion.div
          key='grid'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
        >
          {plantCards}
        </motion.div>
      ) : (
        <motion.div
          key='list'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='space-y-4'
        >
          {plantCards}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
