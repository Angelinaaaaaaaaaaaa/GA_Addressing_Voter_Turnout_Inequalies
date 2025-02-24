import { LatLngExpression } from 'leaflet'

import { Category } from './MarkerCategories' // Ensure this is importing Category correctly

export interface PlaceValues {
  id: number
  position: LatLngExpression
  category: Category
  title: string
  address: string
  county?: string
  vote_center_id?: string
  municipal_precinct?: string
  advanced_polling_place?: string
  polling_place_status?: string
  classification?: string
}

export type PlacesType = PlaceValues[]
export type PlacesClusterType = Record<string, PlaceValues[]>

// Georgia State Government (example: Georgia State Capitol in Atlanta)
export const Places: PlacesType = [
  {
    id: 1,
    position: [33.749, -84.388], // Coordinates for Georgia State Capitol (Atlanta)
    category: Category.CAT1, // Adjust category as needed
    title: 'Georgia State Capitol',
    address: '206 Washington St SW, Atlanta, GA 30334',
  },
  {
    id: 10,
    position: [31.782921593734784, -82.34158446770219],
    category: Category.CAT2,
    title: 'LIONS CLUB BLDG/ AT FAIR GROUNDS',
    address: '245 INDUSTRIAL DR, BAXLEY, GA 31513',
    county: 'APPLING',
    vote_center_id: '001012',
    municipal_precinct: '2',
    advanced_polling_place: 'No',
    polling_place_status: 'Available',
    classification: 'OTHER',
  },
  {
    id: 11,
    position: [31.82651173911722, -82.34719712956571],
    category: Category.CAT2,
    title: '1ST ASSEMBLY OF GOD CHURCH',
    address: '3397 HATCH PKY N, BAXLEY, GA 31513',
    county: 'APPLING',
    vote_center_id: '001018',
    municipal_precinct: '1C',
    advanced_polling_place: 'No',
    polling_place_status: 'Available',
    classification: 'CHURCH',
  },
  {
    id: 12,
    position: [31.876591570517146, -82.36519770627146],
    category: Category.CAT2,
    title: 'ALTAMAHA FIRE STATION',
    address: '392 ALTAMAHA SCHOOL RD, BAXLEY, GA 31513',
    county: 'APPLING',
    vote_center_id: '001001',
    municipal_precinct: '1B',
    advanced_polling_place: 'No',
    polling_place_status: 'Available',
    classification: 'County Building',
  },
  {
    id: 13,
    position: [31.76070657272734, -82.35311114444389],
    category: Category.CAT2,
    title: 'BAX CH OF GOD/FELLOWSHIP HALL',
    address: '353 BLACKSHEAR HWY, BAXLEY, GA 31513',
    county: 'APPLING',
    vote_center_id: '001006',
    municipal_precinct: '4D',
    advanced_polling_place: 'No',
    polling_place_status: 'Available',
    classification: 'CHURCH',
  },
  {
    id: 14,
    position: [31.780851391371186, -82.35252946770325],
    category: Category.CAT2,
    title: 'BAXLEY CITY GYM',
    address: '252 W. PARKER ST., BAXLEY, GA 31513',
    county: 'APPLING',
    vote_center_id: '001002',
    municipal_precinct: '5A',
    advanced_polling_place: 'No',
    polling_place_status: 'Available',
    classification: 'County Building',
  },
  {
    id: 15,
    position: [31.76278792952867, -82.4797366137505],
    category: Category.CAT2,
    title: 'BIG OAKS CH. OF GOD (SOCIAL HALL)',
    address: '5274 LAKE MAYERS RD., BAXLEY, GA 31513',
    county: 'APPLING',
    vote_center_id: '001024',
    municipal_precinct: '5B',
    advanced_polling_place: 'No',
    polling_place_status: 'Available',
    classification: 'CHURCH',
  },
  {
    id: 16,
    position: [31.776831376122647, -82.34541092908958],
    category: Category.CAT2,
    title: 'EXTENSION EDUCATION BLDG/ 4H',
    address: '83 S OAK ST, BAXLEY, GA 31513',
    county: 'APPLING',
    vote_center_id: '001008',
    municipal_precinct: '3C',
    advanced_polling_place: 'No',
    polling_place_status: 'Available',
    classification: 'County Building',
  },
  {
    id: 17,
    position: [31.864739091372133, -82.18037023696952],
    category: Category.CAT2,
    title: 'ZION BAPTIST CH',
    address: '525 ZION BAPTIST CH. RD., BAXLEY, GA 31513',
    county: 'APPLING',
    vote_center_id: '001022',
    municipal_precinct: '3A1',
    advanced_polling_place: 'No',
    polling_place_status: 'Available',
    classification: '',
  },
  {
    id: 18,
    position: [31.612461931803672, -82.2392695984785],
    category: Category.CAT2,
    title: 'ZION CH OF GOD',
    address: '16 PRATT HUTTO RD SE, SURRENCY, GA 31563',
    county: 'APPLING',
    vote_center_id: '001010',
    municipal_precinct: '4B',
    advanced_polling_place: 'No',
    polling_place_status: 'Available',
    classification: 'CHURCH',
  },
]

export default Category // If Category is the object
