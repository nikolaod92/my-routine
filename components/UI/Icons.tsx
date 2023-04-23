import { UserIcon, KeyIcon, EnvelopeIcon } from '@heroicons/react/24/solid'

export const Icons = {
  Email: EnvelopeIcon,
  Password: KeyIcon,
  User: UserIcon,
} as const

export type IconName = keyof typeof Icons
