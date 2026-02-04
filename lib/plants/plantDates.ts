import { getPlantById } from '@/lib/plants/plantQueries';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function getPlantingDates(
  plantId: number,
  year: number = new Date().getFullYear(),
): Date[] {
  const plant = getPlantById(plantId);
  if (!plant) return [];

  return plant.plantingSeason
    .map((month) => {
      const monthIndex = MONTHS.indexOf(month);
      return monthIndex === -1 ? null : new Date(year, monthIndex, 15);
    })
    .filter(Boolean) as Date[];
}
