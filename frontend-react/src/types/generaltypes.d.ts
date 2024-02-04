export interface bannerProps {
    title: string
    subtitle?: string
    image: string
    link?: string
    fullheight?: boolean
}

export interface ButtonProps {
    text?: string | JSX.Element;
    onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
    fill?: boolean;
    autosize?: boolean;
    disabled?: boolean;
    type?: BUTTON | SUBMIT;
}

export interface reviewProps {
    id: number
    name: string
    description: string
    rating: number
    createdAt: Date
    updatedAt: Date
}

export interface bookingProps {
    id: number
    name: string
    email: string
    phone: string
    createdAt: Date
    updatedAt: Date
}

type eventCardProps = {
    event: {
        id: number
        name: string
        description: string
        date: Date
        number_assistants: number
        image?: string
        state?: boolean
        reviews?: reviewProps[]
        bookings?: bookingProps[]
        createdAt?: Date
        updatedAt?: Date
    },
    cancelled?: boolean
    onClick: (id: number) => void
}

export type event = {
    id: number
    name: string
    description: string
    date: Date
    number_assistants: number
    image: string
    state: boolean
    reviews?: reviewProps[]
    bookings?: bookingProps[]
    createdAt?: Date
    updatedAt?: Date
}

type SideBarMenuItemProps = {
    icon: JSX.Element;
    title: string;
    link: string;
}

export type SideBarMenuProps = {
    items: SideBarMenuItemProps[];
}