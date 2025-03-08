import {
    BookOpen,
    Building,
    Building2,
    Cross,
    Factory,
    GraduationCap,
    LandmarkIcon,
    LucideProps,
    PersonStanding,
    ShoppingBag
} from 'lucide-react'
import {FunctionComponent} from 'react'
import colors from 'tailwindcss/colors'

export enum Category {
    STATE_AGENCY = 1,
    BUSINESS = 2,
    CHURCH = 3,
    COLLEGE = 4,
    COUNTY_BUILDING = 5,
    EDUCATION = 6,
    INDUSTRIAL = 7,
    MUNICIPAL_BUILDING = 8,
    OTHER = 9,
    BLANK = 10
}

export interface MarkerCategoriesValues {
    name: string
    icon: FunctionComponent<LucideProps>
    color: string
    hideInMenu?: boolean
}

type MarkerCategoryType = {
    [key in Category]: MarkerCategoriesValues
}

const MarkerCategories: MarkerCategoryType = {
    [Category.STATE_AGENCY]: {
        name: 'State Agency',
        icon: LandmarkIcon,
        color: colors.red[500],
    },
    [Category.BUSINESS]: {
        name: 'Business',
        icon: ShoppingBag,
        color: colors.blue[500],
    },
    [Category.CHURCH]: {
        name: 'Church',
        icon: Cross,
        color: colors.purple[500],
    },
    [Category.COLLEGE]: {
        name: 'College',
        icon: GraduationCap,
        color: colors.yellow[600],
    },
    [Category.COUNTY_BUILDING]: {
        name: 'County Building',
        icon: Building,
        color: colors.green[500],
    },
    [Category.EDUCATION]: {
        name: 'Education',
        icon: BookOpen,
        color: colors.orange[500],
    },
    [Category.INDUSTRIAL]: {
        name: 'Industrial',
        icon: Factory,
        color: colors.gray[600],
    },
    [Category.MUNICIPAL_BUILDING]: {
        name: 'Municipal Building',
        icon: Building2,
        color: colors.teal[500],
    },
    [Category.OTHER]: {
        name: 'Other',
        icon: LandmarkIcon,
        color: colors.pink[500],
    },
    [Category.BLANK]: {
        name: 'Unclassified',
        icon: PersonStanding,
        color: colors.gray[400],
    },
}

export const getCategoryName = (category: Category): string => {
    return MarkerCategories[category].name
}

export const getCategoryColor = (category: Category): string => {
    return MarkerCategories[category].color
}

export const getCategoryIcon = (category: Category): FunctionComponent<LucideProps> => {
    return MarkerCategories[category].icon
}

export default MarkerCategories
